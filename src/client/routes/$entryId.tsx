import { useParams } from "react-router-dom";
import { trpc } from "../util";

export const EntryIdView = () => {
  const { entryId } = useParams();
  if (!entryId) throw new Error("No entryId");
  const { data, error } = trpc.entryById.useQuery(parseInt(entryId));
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div>
      {data ? (
        <>
          <h1 className="text-5xl text-red-500">{data.title}</h1>
          <p>{data.content}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
