"use client";

import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

export default function UserListClient() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Users List</h2>
      {data.users.map((user: any) => (
        <p key={user.id}>
          {user.name} ({user.email})
        </p>
      ))}
    </div>
  );
}
