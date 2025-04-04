"use client";

import { gql, useQuery, useMutation } from "@apollo/client";
import client from "@/app/lib/apolloClient";
import { useState } from "react";
import { Divider } from "@mui/material";

// GraphQL Queries
const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export default function TableClient() {
  const { data, loading, error, refetch } = useQuery(GET_USERS, { client });
  const [createUser] = useMutation(CREATE_USER, { client });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading users.</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">GraphQL Users</h1>

      <div>
        {data?.users.map((user: any) => (
          <p key={user.id}>
            {user.name} ({user.email})
          </p>
        ))}
      </div>
      <Divider />
      <div className="mt-4">
        <input
          className="border p-2 mr-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 mr-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={async () => {
            await createUser({ variables: { name, email } });
            refetch();
            setName("");
            setEmail("");
          }}
        >
          Add User
        </button>
      </div>
    </main>
  );
}
