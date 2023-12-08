import {
  createMemoryRouter,
  Routes,
  Route,
  Link,
  Outlet,
  RouterProvider
} from "react-router-dom";
import { trpc } from "./util";
import { loggerLink, httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { IpcRequest } from "../api";
import superjson from "superjson";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./views/Home";
import "./global.css";
import { Layout } from "./components/Layout";
import { Entry } from "./routes/entry";
import { EntryId } from "./routes/$entryId";

function Index() {
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
            <Layout>
              <Outlet />
            </Layout>
          </QueryClientProvider>
        </trpc.Provider>
      </div>
    </div>
  );
}

const Router = createMemoryRouter([
  {
    path: "/",
    element: <Index />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/entries",
        children: [
          { index: true, element: <Entry /> },
          { path: ":entryId", element: <EntryId /> }
        ]
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={Router} />;
}
