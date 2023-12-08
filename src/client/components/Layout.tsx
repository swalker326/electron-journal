import { Link } from "react-router-dom";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full h-full p-2">
      <div className="flex items-center justify-between">
        <Link to="/">
          <h1 className="text-5xl font-semibold">Journal</h1>
        </Link>
        <input className="p-2 rounded-md" placeholder="Search..." />
      </div>
      <div className="container">{children}</div>
    </div>
  );
};
