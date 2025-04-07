"use server";

import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { gql } from "@apollo/client";

import { getApolloClient } from "@/app/lib/apolloClientSSR";
import { CheckboxSelector } from "@/app/components/checkbox-selector";

interface User {
  id: number;
  name?: string;
  email?: string;
  city?: string;
}

const buildUserListQuery = (fields: string[]) => {
  const fieldList = fields.join("\n");
  return gql`
    query GetAllUsers {
      users {
      id
        ${fieldList}
      }
    }
  `;
};

export default async function Home(props: {
  searchParams?: Promise<{
    filter?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const filter = searchParams?.filter || "";

  const queryValues: string[] = filter.split("/");

  const client = getApolloClient();
  const GET_USERS = buildUserListQuery(queryValues);
  const { data } = await client.query({ query: GET_USERS });

  return (
    <main className="p-6">
      <Typography
        component="h3"
        variant="h3"
        className="text-2xl font-bold mb-4"
      >
        GraphQL Users - Server
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body1">
        Select which fields you want to filter out from the API query.
      </Typography>
      <CheckboxSelector />
      {data ? (
        <Typography variant="body1">
          Approx. size of the returned object:{" "}
          {new Blob([JSON.stringify(data.users)]).size} bytes
        </Typography>
      ) : (
        <Typography variant="body1">Fetching data...</Typography>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User id</TableCell>
              {queryValues.includes("name") && (
                <TableCell align="right">Name</TableCell>
              )}
              {queryValues.includes("email") && (
                <TableCell align="right">Email</TableCell>
              )}
              {queryValues.includes("city") && (
                <TableCell align="right">City</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.users.map((row: User) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                {queryValues.includes("name") && (
                  <TableCell align="right">{row.name}</TableCell>
                )}
                {queryValues.includes("email") && (
                  <TableCell align="right">{row.email}</TableCell>
                )}
                {queryValues.includes("city") && (
                  <TableCell align="right">{row.city || "Null"}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}
