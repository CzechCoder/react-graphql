"use client";

import { Typography, Divider } from "@mui/material";

export default function Home() {
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
      <Typography variant="body1">To be done.</Typography>
    </main>
  );
}
