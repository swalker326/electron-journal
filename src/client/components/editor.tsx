import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export const Editor = ({
  newEntry,
  setNewEntry
}: {
  newEntry: { title: string; content: string };
  setNewEntry: Dispatch<SetStateAction<{ title: string; content: string }>>;
}) => {
  const [edited, setEdited] = useState(false);
  const [saved, setSaved] = useState(true);
  const [needsSave, setNeedsSave] = useState(edited || !saved);
  useEffect(() => {});
  return (
    <div className="w-full h-full flex-grow">
      <h1 className="text-5xl text-red-500">Editor</h1>
      <div>
        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="edit">Edit {needsSave ? "*" : ""}</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <div className="w-full flex flex-col gap-2">
              <input
                name="title"
                placeholder="Title"
                value={newEntry.title}
                className="p-2 rounded-md border border-gray-200"
              />
              <textarea
                placeholder="Express yourself..."
                value={newEntry.content}
                onChange={(e) => {
                  setEdited(true);
                  setNewEntry(() => {
                    return { ...newEntry, content: e.target.value };
                  });
                }}
                cols={23}
                className="p-2 w-full h-[20rem] border border-gray-200 rounded-md resize-none overflow-auto"
              />
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <div className="w-full border border-gray-200">
              <div className="preview bg-white h-[20rem]"></div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
