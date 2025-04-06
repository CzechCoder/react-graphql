"use client";

import { gql, useQuery, useMutation } from "@apollo/client";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

import client from "@/app/lib/apolloClient";

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

interface User {
  id: number;
  name?: string;
  email?: string;
}

function buildUserListQuery(fields: string[]) {
  const fieldList = fields.join("\n");
  return gql`
    query GetUsers {
      users {
      id
        ${fieldList}
      }
    }
  `;
}

export default function TableClient() {
  const [reqFields, setReqFields] = useState<{
    fetchName: boolean;
    fetchEmail: boolean;
  }>({
    fetchName: true,
    fetchEmail: true,
  });
  const [createUser] = useMutation(CREATE_USER, { client });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  console.log(reqFields);

  const fields = [
    reqFields.fetchName && "name",
    reqFields.fetchEmail && "email",
  ].filter(Boolean) as string[];

  const GET_USERS = buildUserListQuery(fields);
  const { data, loading, error } = useQuery(GET_USERS, { client });

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
    setReqFields((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked ? true : false,
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading users.</p>;

  console.log(data);

  return (
    <main className="p-6">
      <Typography
        component="h3"
        variant="h3"
        className="text-2xl font-bold mb-4"
      >
        GraphQL Users
      </Typography>
      <Typography variant="body1">
        Select which fields you want to filter out.
      </Typography>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={reqFields.fetchName}
              onChange={handleCheck}
              name="fetchName"
            />
          }
          label="Name"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={reqFields.fetchEmail}
              onChange={handleCheck}
              name="fetchEmail"
            />
          }
          label="Email"
        />
      </FormGroup>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User id</TableCell>
                {reqFields.fetchName && (
                  <TableCell align="right">Name</TableCell>
                )}
                {reqFields.fetchEmail && (
                  <TableCell align="right">Email</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.users.map((row: User) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  {reqFields.fetchName && (
                    <TableCell align="right">{row.name}</TableCell>
                  )}
                  {reqFields.fetchEmail && (
                    <TableCell align="right">{row.email}</TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Divider />
      {/* <div className="mt-4">
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
      </div> */}
    </main>
  );
}
