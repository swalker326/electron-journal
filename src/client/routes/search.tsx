import { Link, useSearchParams } from "react-router-dom";
import { trpc } from "../util";
import { format } from "date-fns";

export const SearchView = () => {
  const [params] = useSearchParams();
  const q = params.get("q");
  const { data } = trpc.entrySearch.useQuery(q!);
  return (
    <div>
      <h1>Search for {q}</h1>
      <ul>
        {data
          ?.sort((a, b) =>
            a.createdAt.getUTCMilliseconds > b.createdAt.getUTCMilliseconds
              ? 0
              : 1
          )
          ?.map(({ id, title, createdAt }) => (
            <Link key={id} to={`/entries/${id}`}>
              <li>
                <h2 className="text-2xl">{title}</h2>
                <h3>{format(createdAt, "dd/MM/yy")}</h3>
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
};
