import { Link } from "react-router-dom";
import { trpc } from "../util";
import { formatDistanceToNow } from "date-fns";
import { Carousel } from "./ui/carousel";

export const RecentEntries = () => {
  const { data } = trpc.entries.useQuery();
  if (!data) {
    return <>loading...</>;
  }
  return (
    <div className="p-2">
      <h2 className="text-xl font-thin">Recent Entries</h2>
      {data.length === 0 ? (
        <div className="text-gray-500">
          No entries yet. Create one for it to show up here.
        </div>
      ) : (
        <Carousel items={data} />
      )}
    </div>
  );
};
