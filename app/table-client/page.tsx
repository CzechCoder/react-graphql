"use client";

import { gql, useQuery, useMutation } from "@apollo/client";
import {
  Box,
  Checkbox,
  CircularProgress,
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
import { ChangeEvent, useEffect, useState } from "react";

import client from "@/app/lib/apolloClient";

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $city: String!) {
    createUser(name: $name, email: $email, city: $city) {
      id
      name
      email
      city
    }
  }
`;

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

export default function TableClient() {
  const [reqFields, setReqFields] = useState<{
    fetchName: boolean;
    fetchEmail: boolean;
    fetchCity: boolean;
  }>({
    fetchName: true,
    fetchEmail: true,
    fetchCity: true,
  });
  const [createUser] = useMutation(CREATE_USER, { client });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fields = [
    reqFields.fetchName && "name",
    reqFields.fetchEmail && "email",
    reqFields.fetchCity && "city",
  ].filter(Boolean) as string[];

  const GET_USERS = buildUserListQuery(fields);
  const { data, loading, error, refetch } = useQuery(GET_USERS, { client });

  useEffect(() => {
    refetch();
  }, [reqFields]);

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setReqFields((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked ? true : false,
    }));
  };

  if (error)
    return (
      <p>There was an error loading users. Please contact the administrator.</p>
    );

  return (
    <main className="p-6">
      <Typography
        component="h3"
        variant="h3"
        className="text-2xl font-bold mb-4"
      >
        GraphQL Users - Client
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body1">
        Select which fields you want to filter out from the API query.
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
        <FormControlLabel
          control={
            <Checkbox
              checked={reqFields.fetchCity}
              onChange={handleCheck}
              name="fetchCity"
            />
          }
          label="City"
        />
      </FormGroup>
      {data ? (
        <Typography variant="body1">
          Approx. size of the returned object:{" "}
          {new Blob([JSON.stringify(data.users)]).size} bytes
        </Typography>
      ) : (
        <Typography variant="body1">Fetching data...</Typography>
      )}
      <div>
        {loading ? (
          <Box
            display="flex"
            flexDirection="column"
            textAlign="center"
            alignItems="center"
            justifyContent="center"
            gap={4}
            py={4}
          >
            <CircularProgress color="primary" />
            <Typography variant="h5" color="primary">
              Loading...
            </Typography>
          </Box>
        ) : (
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
                  {reqFields.fetchCity && (
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
                    {reqFields.fetchName && (
                      <TableCell align="right">{row.name}</TableCell>
                    )}
                    {reqFields.fetchEmail && (
                      <TableCell align="right">{row.email}</TableCell>
                    )}
                    {reqFields.fetchCity && (
                      <TableCell align="right">{row.city || "Null"}</TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
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
