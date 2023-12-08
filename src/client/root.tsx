import {
  MemoryRouter as Router,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";
import { trpc } from "./util";
import { loggerLink, httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { IpcRequest } from "../api";
import superjson from "superjson";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./views/Home";

// import icon from '../../assets/icon.svg';
// import "./global.css";
// import { Form } from "./components/ui/form";
// import { AppNav } from "./components/ui/nav/AppNav";
// import { History } from "./views/History";
// import { Home } from "./views/Home";

function Layout() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false
          }
        }
      })
  );
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink(),
        httpBatchLink({
          url: "/trpc",

          // custom fetch implementation that sends the request over IPC to Main process
          fetch: async (input, init) => {
            const req: IpcRequest = {
              url:
                input instanceof URL
                  ? input.toString()
                  : typeof input === "string"
                  ? input
                  : input.url,
              method: input instanceof Request ? input.method : init?.method!,
              headers:
                input instanceof Request ? input.headers : init?.headers!,
              body: input instanceof Request ? input.body : init?.body!
            };

            const resp = await window.appApi.trpc(req);

            return new Response(resp.body, {
              status: resp.status,
              headers: resp.headers
            });
          }
        })
      ],
      transformer: superjson
    })
  );
  return (
    <div className="flex flex-col items-between">
      {/* <AppNav /> */}
      <div className="container">
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </trpc.Provider>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/history" element={<>History</>} />
        </Route>
      </Routes>
    </Router>
  );
}
