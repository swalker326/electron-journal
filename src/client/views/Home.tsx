import { RecentEntries } from "../components/RecentEntries";
import { trpc } from "../util";

export const Home = () => {
  const { data } = trpc.userById.useQuery(1);
  console.log("users1", data);
  return (
    <div>
      <RecentEntries />
    </div>
  );
};
