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
  userById: t.procedure.input(z.string()).query(({ input: id }) => {
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
        pin: z.string()
      })
    )
    .mutation(async ({ input: { name, pin } }) => {
      const user = await prisma.user.create({
        data: {
          name,
          pin
        }
      });

      return user;
    }),
  entries: t.procedure
    .input(z.object({ limit: z.number() }).optional())
    .query(({ input }) => {
      return prisma.entry.findMany({
        take: input?.limit || 10,
        orderBy: { createdAt: "desc" }
      });
    }),
  entryDelete: t.procedure.input(z.string()).mutation(async ({ input }) => {
    const entry = await prisma.entry.delete({
      where: {
        id: input
      }
    });

    return entry;
  }),
  entryCreate: t.procedure
    .input(
      z.object({
        name: z.string(),
        content: z.string()
      })
    )
    .mutation(async ({ input: { name, content } }) => {
      const entry = await prisma.entry.create({
        data: {
          title: name,
          content
        }
      });

      return entry;
    }),
  entryUpsert: t.procedure
    .input(
      z.object({
        id: z.string().optional(),
        title: z.string(),
        content: z.string()
      })
    )
    .mutation(async ({ input: { id = "", title, content } }) => {
      const entry = await prisma.entry.upsert({
        where: { id },
        update: {
          title,
          content
        },
        create: {
          title,
          content
        }
      });

      return entry;
    }),
  entryUpdate: t.procedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        content: z.string()
      })
    )
    .mutation(async ({ input: { id, title, content } }) => {
      const entry = await prisma.entry.update({
        where: {
          id
        },
        data: {
          title,
          content
        }
      });

      return entry;
    }),
  entrySearch: t.procedure.input(z.string()).query(async ({ input }) => {
    const results = await prisma.entry.findMany();
    return results.filter((entry) => {
      const titleMatch = entry.title.includes(input);
      const contentMatch = entry.content.includes(input);
      return titleMatch || contentMatch;
    });
  }),
  entryById: t.procedure.input(z.string()).query(({ input: id }) => {
    return prisma.entry.findUnique({
      where: {
        id
      }
    });
  })
});

export type AppRouter = typeof appRouter;
