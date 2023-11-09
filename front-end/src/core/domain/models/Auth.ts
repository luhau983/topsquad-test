import z from 'zod';

const ResRegister = z.object({
  message: z.string(),
  data: z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
    status: z.number(),
    phone: z.string(),
    roles: z.array(z.object({ id: z.number(), name: z.string() })),
  }),
  status: z.null(),
  rowCount: z.number(),
  errorCode: z.null(),
});

export type TResRegister = z.infer<typeof ResRegister>;

const ResLogin = z.object({
  message: z.string(),
  data: z.object({
    token: z.string(),
    type: z.string(),
    id: z.number(),
    username: z.string(),
    email: z.string(),
    roles: z.array(z.string()),
  }),
  status: z.null(),
  rowCount: z.number(),
  errorCode: z.null(),
});

export type TResLogin = z.infer<typeof ResLogin>;
