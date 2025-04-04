import { createYoga, createSchema } from "graphql-yoga";
import PrismaClient from "@prisma/client";

const prisma = new PrismaClient.PrismaClient();

// GraphQL Schema
const schema = createSchema({
  typeDefs: `
    type User {
      id: ID!
      name: String!
      email: String!
    }

    type Query {
      users: [User]!
    }

    type Mutation {
      createUser(name: String!, email: String!): User
    }
  `,
  resolvers: {
    Query: {
      users: async () => await prisma.user.findMany(),
    },
    Mutation: {
      createUser: async (
        _: any,
        { name, email }: { name: string; email: string }
      ) => {
        return await prisma.user.create({ data: { name, email } });
      },
    },
  },
});

// API Route Handler
export const { handleRequest } = createYoga({ schema });

export { handleRequest as GET, handleRequest as POST };
