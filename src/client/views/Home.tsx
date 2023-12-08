import { useState } from "react";
import { RecentEntries } from "../components/RecentEntries";
import { Editor } from "../components/editor";
import { trpc } from "../util";

export const Home = () => {
  const { data } = trpc.userById.useQuery(1);
  const [newEntry, setNewEntry] = useState({ title: "", content: "" });
  return (
    <div className="flex flex-col justify-between h-full">
      <Editor newEntry={newEntry} setNewEntry={setNewEntry} />
      <RecentEntries />
    </div>
  );
};
