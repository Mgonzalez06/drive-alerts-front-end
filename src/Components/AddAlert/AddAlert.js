import React, { useState } from "react";
import { Button, TextField, Stack } from "@mui/material";
import { addReport } from "../../Functions/Reports";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export const AddAlert = ({ location, setReports }) => {
  const [description, setDescription] = useState("");

  const handleAddReport = () => {
    addReport(location, description, setDescription, setReports);
  };

  return (
    <Stack
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      mt={2}
    >
      <TextField
        type="text"
        autoComplete="off"
        label="Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={handleAddReport}
        sx={{ mt: { xs: 2, md: 0 } }}
      >
        <AddOutlinedIcon />
        Report
      </Button>
    </Stack>
  );
};
