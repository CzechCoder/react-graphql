"use client";

import { Typography } from "@mui/material";

export default function Error() {
  return (
    <div className="flex flex-col px-0 md:px-1 py-6 gap-4 w-full text-left">
      <Typography variant="h4">
        There was an error when fetching data in client table.
      </Typography>
      <Typography variant="h5">Please contact the administrator.</Typography>
    </div>
  );
}
