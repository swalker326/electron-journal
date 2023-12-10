import { useParams } from "react-router-dom";
import { trpc } from "../../util";
import { EntryMenu } from "./entry-menu";
import { useNavigate } from "react-router-dom";
import Markdown from "marked-react";
import { useEffect } from "react";
import { RecentEntries } from "../../components/RecentEntries";

export const EntryIdView = () => {
  const navigate = useNavigate();
  const { entryId } = useParams();

  if (!entryId) throw new Error("No entryId");
  const { data, error } = trpc.entryById.useQuery(parseInt(entryId));

  useEffect(() => {
    if (data) {
      document.title = data.title;
    }
  });

  const { mutate, data: mutationData } = trpc.entryDelete.useMutation({
    onSuccess: () => {
      console.log("deleted");
      navigate("/");
    },
    onError: (err) => {
      console.error(err);
    }
  });
  console.log("DATA", data);

  const onEdit = () => {
    navigate(`/entries/${entryId}/edit`);
  };

  const onDelete = () => {
    mutate(parseInt(entryId));
  };

  return (
    <div className="mt-4">
      {data ? (
        <>
          <div className="flex justify-between">
            <h1 className="text-5xl text-red-500">{data.title}</h1>
            <EntryMenu onEdit={onEdit} onDelete={onDelete} />
          </div>
          <article className="prose dark:prose-invert mt-2">
            <Markdown>{data.content}</Markdown>
          </article>
        </>
      ) : (
        <p>Fetching entry...</p>
      )}
      <div className="mt-10">
        <RecentEntries currentEntry={data ? data : null} />
      </div>
      {error && (
        <div className="w-full bg-red-100 p-4 rounded-md mt-3">
          <h1 className="text-red-500">Error Loading Entry</h1>
        </div>
      )}
    </div>
  );
};
