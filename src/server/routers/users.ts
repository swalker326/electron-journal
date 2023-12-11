import { z } from "zod";
import { prisma } from "../prisma";
import { t } from "../router";

export const userRouter = t.router({
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
    })
});
