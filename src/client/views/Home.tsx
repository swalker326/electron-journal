import { RecentEntries } from "../components/RecentEntries";
import { trpc } from "../util";

export const Home = () => {
  const { data } = trpc.userById.useQuery(1);
  return (
    <div>
      <RecentEntries />
    </div>
  );
};
