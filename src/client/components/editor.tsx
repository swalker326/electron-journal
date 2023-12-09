import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { trpc } from "../util";

export const Editor = ({
  newEntry,
  setNewEntry
}: {
  newEntry: { title: string; content: string };
  setNewEntry: Dispatch<SetStateAction<{ title: string; content: string }>>;
}) => {
  const [saved, setSaved] = useState(true);
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);
  const { mutate, data, error } = trpc.entryUpsert.useMutation();
  const handleSave = async () => {
    console.log(newEntry);
    if (newEntry.title === "" || newEntry.content === "") {
      return;
    }
    console.log("saving...");
    await mutate({ id: data?.id, ...newEntry });
    setSaved(true);
  };
  const handleSaveTimeout = () => {
    if (saveTimeout) {
      console.log("clearing timeout");
      clearTimeout(saveTimeout);
    }
    if (!saved) {
      const timeOut = setTimeout(() => {
        console.log("saving...");
        handleSave();
      }, 5000);
      setSaveTimeout(timeOut);
    }
  };

  return (
    <div className="w-full h-full flex-grow">
      <h1 className="text-5xl text-red-500 py-1">Thoughts</h1>
      <div>
        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <div className="w-full flex justify-end">
            {saved ? (
              <span className="text-gray-400 text-sm font-light">saved</span>
            ) : (
              <span className="text-gray-700 text-sm font-light">*unsaved</span>
            )}
          </div>
          <TabsContent value="edit">
            <div className="w-full flex flex-col gap-2 relative">
              <input
                name="title"
                placeholder="Title"
                value={newEntry.title}
                className="p-2 rounded-md border border-gray-200"
                onChange={(e) => {
                  handleSaveTimeout();
                  setSaved(false);
                  setNewEntry(() => {
                    return { ...newEntry, title: e.target.value };
                  });
                }}
              />
              <textarea
                placeholder="Express yourself..."
                value={newEntry.content}
                onChange={(e) => {
                  handleSaveTimeout();
                  setSaved(false);
                  setNewEntry(() => {
                    return { ...newEntry, content: e.target.value };
                  });
                }}
                cols={23}
                className="p-2 w-full h-[20rem] border border-gray-200 rounded-md resize-none overflow-auto"
              />
              <button
                disabled={saved}
                onClick={handleSave}
                className="absolute bottom-3 right-3 p-2 px-3 rounded-md border-2 border-gray-200 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed  disabled:hover:border-gray-200 "
              >
                Save
              </button>
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <div className="w-full border border-gray-200">
              <div className="preview bg-white h-[20rem]">{}</div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {error && (
        <div className="bg-red-500 text-white p-2 rounded-md">
          {error.message}
        </div>
      )}
    </div>
  );
};
