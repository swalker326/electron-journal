import { useParams } from "react-router-dom";
import { trpc } from "../../util";
import { Editor } from "../../components/editor/editor";

export const EntryIdEdit = () => {
  const params = useParams();
  const entryId = params.entryId;
  if (!entryId) throw new Error("No entryId");
  const { data, error } = trpc.entryById.useQuery(entryId);
  if (!data) return <p>No record found, are you sure it exists?</p>;
  return (
    <>
      <Editor entry={data} />
    </>
  );
};
