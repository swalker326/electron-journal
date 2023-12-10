import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { trpc } from "../../util";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDebounceSubmit } from "../../hooks/useDebounceSubmit";
import { DeleteDialog } from "./delete-modal";
import { Entry } from "../../../generated/client";

const EntrySchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  content: z.string().min(1)
});

type EntryType = z.infer<typeof EntrySchema>;

export const Editor = ({ entry }: { entry?: Entry }) => {
  const { mutate, data } = trpc.entryUpsert.useMutation({
    onError: (err) => {
      toast.error("Problem saving");
      console.error(err);
    },
    onSuccess: (data) => {
      const { title, content } = data;
      reset({ title, content });
    }
  });
  const { mutate: deleteEntry } = trpc.entryDelete.useMutation({
    onError: (err) => {
      toast.error("Problem deleting");
      console.error(err);
    },
    onSuccess: () => {
      reset({ title: "", content: "" });
      toast.success("Entry deleted");
    }
  });
  const handleDelete = () => {
    if (!data?.id) {
      toast.error("No entry to delete");
      return;
    }
    deleteEntry(data?.id);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, dirtyFields },
    watch
  } = useForm({
    resolver: zodResolver(EntrySchema),
    defaultValues: {
      title: data?.title || entry?.title || "",
      content: data?.content || entry?.content || ""
    }
  });

  const [isSaved, setIsSaved] = useState(false);
  const formData = watch();

  const onSubmit: SubmitHandler<EntryType> = async ({ content, title }) => {
    console.log(content, title);
    console.log("onSubmit...");
    mutate({ id: data?.id || entry?.id, content, title });
  };

  const { debouncedSubmit, cancel } = useDebounceSubmit(
    handleSubmit(onSubmit),
    5000
  );

  useEffect(() => {
    if (!dirtyFields["content"] || !dirtyFields["title"]) {
      cancel();
    } else {
      setIsSaved(() => false);
    }
    if (dirtyFields["content"] && dirtyFields["title"] && !isSaved) {
      debouncedSubmit();
    }
  }, [formData]);

  return (
    <div className="w-full h-full flex-grow">
      <h1 className="text-5xl text-red-500 py-1">Thoughts</h1>
      <div>
        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="w-full relative ">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <DeleteDialog onClick={handleDelete} />
            {/* <button className="absolute right-0 border border-red-400 px-2 py-0.5 rounded-md text-red-400 hover:bg-red-100 transition-colors ease-linear duration-100">
              Delete
            </button> */}
          </TabsList>
          <div className="w-full flex justify-center">
            {isDirty ? (
              isSaved ? (
                <span className="text-gray-400 text-sm font-light">saved</span>
              ) : (
                <span className="text-gray-700 text-sm font-light">
                  *unsaved
                </span>
              )
            ) : (
              <span className="text-gray-400 text-sm font-light">saved</span>
            )}
          </div>
          <TabsContent value="edit">
            <div className="w-full flex flex-col gap-2 relative">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <div className="relative">
                  <input
                    {...register("title")}
                    placeholder="Title"
                    className={`p-2 rounded-md border border-gray-200 w-full ${
                      errors.title
                        ? "border-red-300 bg-red-100"
                        : "border-gray-200"
                    }`}
                  />
                  {errors.title && (
                    <div className=" absolute right-2 top-2">
                      <span className="text-red-600 p-2">
                        Try giving your entry a title
                      </span>
                    </div>
                  )}
                </div>
                <div className="relative">
                  {errors.content && (
                    <div className="absolute top-2 right-2">
                      <span className="text-red-500 p-2">
                        You really should journal something before submitting
                      </span>
                    </div>
                  )}
                  <textarea
                    {...register("content")}
                    placeholder="Express yourself..."
                    cols={23}
                    className={`p-2 w-full h-[20rem] border border-gray-200 rounded-md resize-none overflow-auto ${
                      errors.content
                        ? "border-red-300 bg-red-100"
                        : "border-gray-200"
                    }`}
                  />
                  <button
                    type="submit"
                    className="transition-colors ease-linear duration-100 absolute bottom-3 right-3 px-2 py-0.5 rounded-md border-2 border-gray-200 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed  disabled:hover:border-gray-200 "
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <div className="w-full border border-gray-200">
              <div className="preview bg-white h-[20rem]">{}</div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
