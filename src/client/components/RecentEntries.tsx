import { Link } from "react-router-dom";
import { trpc } from "../util";
import { formatDistanceToNow } from "date-fns";

export const RecentEntries = () => {
  const { data } = trpc.entries.useQuery();
  if (!data) {
    return <>loading...</>;
  }
  return (
    <div className="relative h-32 border">
      <h2 className="text-xl font-thin">Recent Updates</h2>
      <div className="absolute top-10 left-0 flex w-full gap-4 overflow-x-scroll">
        {[...data, ...data, ...data, ...data, ...data, ...data].map((e) => {
          return (
            <Link className="w-1/4 flex flex-col gap-1" to={`/entries/${e.id}`}>
              <div key={e.id}>
                <div className="text-white font-light text-xl flex flex-col bg-blue-500 rounded-md p-3 hover:bg-blue-400">
                  <h2>{e.title}</h2>
                  <span className="text-gray-300 text-sm">
                    {formatDistanceToNow(e.createdAt, { addSuffix: true })}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
