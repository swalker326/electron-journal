import { trpc } from "../util";

export const Home = () => {
  const users = trpc.users.useQuery();
  console.log("users", users);
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome home!</p>
      {users.data?.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
        </div>
      ))}
    </div>
  );
};
