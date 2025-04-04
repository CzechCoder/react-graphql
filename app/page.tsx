"use server";

import { CssBaseline, Divider } from "@mui/material";
import { gql } from "@apollo/client";
import client from "@/app/lib/apolloClient";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

export default async function Home() {
  // const { data } = await client.query({ query: GET_USERS });

  return (
    <div className="flex flex-col px-0 md:px-1 py-6 gap-4 w-full text-left">
      <h1>Users List</h1>
      {/* {data?.users.map((user: any) => (
        <p key={user.id}>
          {user.name} ({user.email})
        </p>
      ))} */}
    </div>
  );
}
