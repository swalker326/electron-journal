import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams
} from "react-router-dom";
import useDebouncedCallback from "../hooks/useDebounceCallback";
import { useState } from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const handleSubmit = (s: string) => navigate(`/search?q=${s}`);
  const debouncedSubmit = useDebouncedCallback(
    (searchValue: string) => handleSubmit(searchValue),
    700
  );
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value;
    debouncedSubmit(newSearchValue);
  };

  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full h-full pt-2 ">
      {/* {location.pathname}
      {location.search} */}
      <div className="flex items-center justify-between">
        <Link to="/">
          <h1 className="text-5xl">Journal</h1>
        </Link>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const value = e.currentTarget.search.value;
            handleSubmit(value);
          }}
        >
          <input
            name="search"
            className="p-2 rounded-md border border-gray-200"
            placeholder="Search..."
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <div className="h-full">{children}</div>
    </div>
  );
};
