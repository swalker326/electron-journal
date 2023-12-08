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
    <div className="relative">
      <h2 className="text-xl font-thin">Recent Entries</h2>
      <Carousel items={data} />
    </div>
  );
};
