import { useParams } from "react-router-dom";
import { trpc } from "../../util";
import { EntryMenu } from "./entry-menu";
import { useNavigate } from "react-router-dom";

export const EntryIdView = () => {
  const navigate = useNavigate();
  const { entryId } = useParams();

  if (!entryId) throw new Error("No entryId");

  const { data, error } = trpc.entryById.useQuery(parseInt(entryId));
  const { mutate, data: mutationData } = trpc.entryDelete.useMutation({
    onSuccess: () => {
      console.log("deleted");
      navigate("/");
    },
    onError: (err) => {
      console.error(err);
    }
  });
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
          <p className="prose prose-slate">{data.content}</p>
        </>
      ) : (
        <p>Fetching entry...</p>
      )}
      {error && (
        <div className="w-full bg-red-100 p-4 rounded-md mt-3">
          <h1 className="text-red-500">Error Loading Entry</h1>
        </div>
      )}
    </div>
  );
};
