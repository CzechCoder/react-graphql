import { createYoga, createSchema } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";

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

    type Mutation {
      createUser(name: String!, email: String!, city: String!): User
    }
  `,
    resolvers: {
      Query: {
        users: async () => await prisma.user.findMany(),
      },
      Mutation: {
        createUser: async (
          _: any,
          { name, email, city }: { name: string; email: string; city: string }
        ) => {
          return await prisma.user.create({ data: { name, email, city } });
        },
      },
    },
  }),
});

export const GET = (req: Request) => handleRequest(req, {});
export const POST = (req: Request) => handleRequest(req, {});
