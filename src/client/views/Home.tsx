import { useState } from "react";
import { RecentEntries } from "../components/RecentEntries";
import { Editor } from "../components/editor/editor";
import { trpc } from "../util";

export const Home = () => {
  const { data } = trpc.userById.useQuery(1);
  document.title = data?.name || "Journal";
  return (
    <div className="flex flex-col justify-between h-full">
      <Editor />
      <RecentEntries />
    </div>
  );
};
