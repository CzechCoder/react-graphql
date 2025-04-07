import { createYoga, createSchema } from "graphql-yoga";
import { PrismaClient } from ".prisma/client";
// NOTE Use the import below when pushing for production.
// NOTE Vercel build can't find the client otherwise.
// import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs: `
    type User {
      id: ID!
      name: String!
      email: String!
      city: String!
    }

    type Query {
      users: [User]!
    }

    type Query {
      user(id: ID!): User
    }

    type Mutation {
      updateUser(id: ID!, name: String!, email: String!, city: String!): User
    }
  `,
    resolvers: {
      Query: {
        users: async () => await prisma.user.findMany(),
        user: async (_: any, { id }: { id: string }) =>
          await prisma.user.findUnique({ where: { id: Number(id) } }),
      },
      Mutation: {
        updateUser: async (
          _: any,
          {
            id,
            name,
            email,
            city,
          }: { id: string; name: string; email: string; city: string }
        ) => {
          return await prisma.user.update({
            where: { id: Number(id) },
            data: { name, email, city },
          });
        },
      },
    },
  }),
});

export const GET = (req: Request) => handleRequest(req, {});
export const POST = (req: Request) => handleRequest(req, {});
