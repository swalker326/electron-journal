import { trpc } from "../util";
import { Carousel } from "./ui/carousel";
import { Entry } from "../../generated/client";
import { useEffect, useState } from "react";

export const RecentEntries = ({
  currentEntry
}: {
  currentEntry?: Entry | null;
}) => {
  const [entries, setCurrentEntries] = useState<Entry[]>([]);
  const { data } = trpc.entries.useQuery();
  useEffect(() => {
    if (data) {
      setCurrentEntries(() => data.filter((d) => d.id != currentEntry?.id));
    }
  }, [data, currentEntry]);

  return (
    <div className="p-2">
      <h2 className="text-xl font-thin">Recent Entries</h2>
      {data?.length === 0 ? (
        <div className="text-gray-500">
          No entries yet. Create one for it to show up here.
        </div>
      ) : (
        <Carousel items={data || []} />
      )}
    </div>
  );
};
