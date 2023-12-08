import { prisma } from "../prisma";
import { t } from "../router";

export const entryRouter = t.router({
  entries: t.procedure.query(() => {
    return prisma.entry.findMany();
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
