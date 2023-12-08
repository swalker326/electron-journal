import { initTRPC } from "@trpc/server";
import { prisma } from "./prisma";
import superjson from "superjson";
import { z } from "zod";

export const t = initTRPC.create({
  transformer: superjson
});

export const appRouter = t.router({
  users: t.procedure.query(() => {
    return prisma.user.findMany();
  }),
  userById: t.procedure
    .input((val: unknown) => {
      if (typeof val !== "number") {
        throw new Error("invalid input");
      }
      return val;
    })
    .query(({ input: id }) => {
      return prisma.user.findUnique({
        where: {
          id
        }
      });
    }),
  userCreate: t.procedure
    .input(
      z.object({
        name: z.string(),
        dateCreated: z.date()
      })
    )
    .mutation(async ({ input: { name, dateCreated } }) => {
      console.log("Creating user on ", dateCreated.toLocaleString());
      const user = await prisma.user.create({
        data: {
          name
        }
      });

      return user;
    }),
  entries: t.procedure
    .input(z.object({ limit: z.number() }).optional())
    .query(({ input }) => {
      return prisma.entry.findMany({ take: input?.limit || 10 });
    }),
  entrySearch: t.procedure.input(z.string()).query(async ({ input }) => {
    const results = await prisma.entry.findMany();
    console.log(results);
    return results.filter((entry) => {
      const titleMatch = entry.title.includes(input);
      const contentMatch = entry.content.includes(input);
      return titleMatch || contentMatch;
    });
  }),
  entryById: t.procedure
    .input((val: unknown) => {
      if (typeof val !== "number") {
        throw new Error("invalid input");
      }
      return val;
    })
    .query(({ input: id }) => {
      return prisma.entry.findUnique({
        where: {
          id
        }
      });
    })
});

export type AppRouter = typeof appRouter;
