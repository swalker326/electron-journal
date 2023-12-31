import { Link, useSearchParams } from "react-router-dom";
import { trpc } from "../util";
import { format } from "date-fns";

export const SearchView = () => {
  document.title = "Search";
  const [params] = useSearchParams();
  const q = params.get("q");
  const { data } = trpc.entrySearch.useQuery(q!);
  if (q !== "") {
    document.title = `Search: ${q}`;
  }
  return (
    <div>
      <h1 className="text-5xl text-red-500 py-1">Search</h1>
      <h1 className="text-center text-2xl font-thin">results for "{q}"</h1>
      <ul>
        {data?.length === 0 ? (
          <>
            No results found 😭 try{" "}
            <Link to="/" className="text-blue-400 underline">
              adding one
            </Link>
          </>
        ) : (
          data
            ?.sort((a, b) =>
              a.createdAt.getUTCMilliseconds > b.createdAt.getUTCMilliseconds
                ? 0
                : 1
            )
            .map(({ id, title, createdAt }) => (
              <Link key={id} to={`/entries/${id}`}>
                <li>
                  <h2 className="text-2xl">{title}</h2>
                  <h3>{format(createdAt, "dd/MM/yy")}</h3>
                </li>
              </Link>
            ))
        )}
      </ul>
    </div>
  );
};
