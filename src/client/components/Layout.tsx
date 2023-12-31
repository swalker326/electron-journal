import { Link, useLocation, useNavigate } from "react-router-dom";
import useDebouncedCallback from "../hooks/useDebounceCallback";
import { Toaster } from "react-hot-toast";
import { ChevronLeft } from "lucide-react";
import { Input } from "./ui/input";
import { DarkmodeSwitch } from "./ui/darkmode-switch";

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
    <div className="flex flex-col w-full h-full pt-2">
      {/* {location.pathname}
      {location.search} */}
      <div className="flex items-start justify-between ">
        <Toaster />
        <div>
          {location.pathname !== "/" && (
            <button onClick={() => navigate(-1)}>
              <ChevronLeft />
            </button>
          )}
          <Link to="/">
            <h1 className="text-5xl">Journal</h1>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const value = e.currentTarget.search.value;
              handleSubmit(value);
            }}
          >
            <Input
              name="search"
              placeholder="Search..."
              onChange={handleSearchChange}
            />
          </form>
          <DarkmodeSwitch />
        </div>
      </div>
      <div className="h-full">{children}</div>
    </div>
  );
};
