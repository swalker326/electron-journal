import { trpc } from "../util";

export const Home = () => {
  const { data } = trpc.users.useQuery();
  console.log("users1", data);
  return (
    <div>
      <h1 className="text-5xl text-red-500">Home</h1>
      <p>Welcome home!</p>
      {data?.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
        </div>
      ))}
    </div>
  );
};
