"use client";

import {
  Typography,
  Divider,
  Box,
  Button,
  TextField,
  Select,
  SelectChangeEvent,
  MenuItem,
  Stack,
  CircularProgress,
  AlertColor,
} from "@mui/material";
import { gql, useQuery, useMutation } from "@apollo/client";
import { FormEvent, useEffect, useState } from "react";

import { CustomSnackbar } from "@/app/components/snackbar";
import client from "@/app/lib/apollo-client";
import { User } from "@/app/lib/types";

const GET_USERLIST = gql`
  query GetAllUsersForSelect {
    users {
      id
      name
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $name: String!
    $email: String!
    $city: String!
  ) {
    updateUser(id: $id, name: $name, email: $email, city: $city) {
      id
      name
      email
      city
    }
  }
`;

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      city
    }
  }
`;

export default function Home() {
  const [userId, setUserId] = useState<string>("1");
  const [snackState, setSnackState] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "success" as AlertColor,
  });

  const [updateUser] = useMutation(UPDATE_USER, { client });
  const { data: userList } = useQuery(GET_USERLIST, { client });
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    client,
    variables: { id: userId },
  });

  const [formData, setFormData] = useState({
    name: data?.user?.name,
    email: data?.user?.email,
    city: data?.user?.city,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    city: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleUserChange = (event: SelectChangeEvent<typeof userId>) => {
    setUserId(event.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateUser({
        variables: { id: userId, ...formData },
      });
      setSnackState({
        open: true,
        message: "User data changed successfully.",
        severity: "success",
      });
    } catch (err) {
      console.error(err);
      setSnackState({
        open: true,
        message: "Failed to update user.",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    if (data?.user) {
      setFormData({
        name: data.user.name || "",
        email: data.user.email || "",
        city: data.user.city || "",
      });
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [userId]);

  return (
    <main className="p-6">
      <Typography
        component="h3"
        variant="h3"
        className="text-2xl font-bold mb-4"
      >
        GraphQL Form - Client
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Stack gap={2}>
        Select whose details you want to edit.
        <Select
          onChange={handleUserChange}
          value={userId}
          sx={{ maxWidth: { xs: "100%", sm: 250 } }}
        >
          {userList ? (
            userList.users.map((user: User) => (
              <MenuItem value={user.id}>{user.name}</MenuItem>
            ))
          ) : (
            <MenuItem value="1">
              <Typography color="primary">Loading users data...</Typography>
            </MenuItem>
          )}
        </Select>
      </Stack>
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
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ maxWidth: 400, mx: "auto", p: 2 }}
        >
          <Typography variant="h6" gutterBottom>
            Edit user details
          </Typography>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
          />
          <TextField
            fullWidth
            label="City"
            name="city"
            value={formData.city || ""}
            onChange={handleInputChange}
            error={!!errors.city}
            helperText={errors.city}
            margin="normal"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      )}

      <CustomSnackbar snackState={snackState} onClose={setSnackState} />
    </main>
  );
}
