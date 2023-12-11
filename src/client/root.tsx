import {
  createMemoryRouter,
  Outlet,
  redirect,
  RouterProvider,
  ScrollRestoration
} from "react-router-dom";
import { trpc } from "./util";
import { trpc as trpcAction } from "./renderer";
import { loggerLink, httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { IpcRequest } from "../api";
import superjson from "superjson";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./views/Home";
import { Layout } from "./components/Layout";
import { EntryView } from "./routes/entry";
import { EntryIdView } from "./routes/$entryId/view";
import { SearchView } from "./routes/search";

import "./global.css";
import { EntryIdEdit } from "./routes/$entryId/edit";
import { LockScreen } from "./components/lock-screen";
import { prisma } from "../server/prisma";

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
    <div className="container min-h-screen">
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Outlet />
            <ScrollRestoration />
          </Layout>
        </QueryClientProvider>
      </trpc.Provider>
    </div>
  );
}

const Router = createMemoryRouter([
  {
    path: "/",
    element: <Index />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => {
          console.log("Loading...", this);
          const isLocked = localStorage.getItem("locked");
          if (isLocked === "true") {
            return redirect("/locked");
          }
          return { data: {} };
        }
      },
      { path: "/search", element: <SearchView /> },
      {
        path: "/entries",
        children: [
          { index: true, element: <EntryView /> },
          { path: ":entryId", element: <EntryIdView /> },
          { path: ":entryId/edit", element: <EntryIdEdit /> }
        ]
      }
    ]
  },
  {
    path: "/locked",
    element: <LockScreen />,
    action: async ({ request }) => {
      console.log("Action...", this);
      const user = await trpcAction.userById.query("me");
      console.log(request);
      // const { data: user } = trpc.userById.useQuery("me");
      console.log("USER:", user);
      if (!user) {
        return redirect("/locked");
      }
      if (user) {
        localStorage.setItem("locked", "false");
        return redirect("/");
      }
    }
  },
  { path: "*", element: <div>Not found</div> }
]);

export default function App() {
  return <RouterProvider router={Router} />;
}
