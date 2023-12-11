import { z } from "zod";
import { prisma } from "../prisma";
import { t } from "../router";

export const entryRouter = t.router({
  entries: t.procedure.query(() => {
    return prisma.entry.findMany();
  }),
  entryById: t.procedure.input(z.string()).query(({ input: id }) => {
    return prisma.entry.findUnique({
      where: {
        id
      }
    });
  })
});
