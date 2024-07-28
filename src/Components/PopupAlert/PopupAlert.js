import React from "react";
import { Popup } from "react-leaflet";
import { Button, Typography, Stack } from "@mui/material";
import { upvoteReport, downvoteReport } from "../../Functions/Reports";

export const PopupAlert = ({ report, index, setReports }) => {
  const handleUpvote = () => {
    upvoteReport(index, setReports);
  };

  const handleDownvote = () => {
    downvoteReport(index, setReports);
  };

  return (
    <Popup width="400px">
      <Typography variant="body1">
        <strong>Description:</strong> {report[2]}
      </Typography>
      <Typography variant="body1">
        <strong>Timestamp:</strong>{" "}
        {new Date(report.timestamp * 1000).toLocaleString()}
      </Typography>
      <Typography variant="body1">
        <strong>Upvotes:</strong> {report.upvotes}
      </Typography>
      <Typography variant="body1">
        <strong>Downvotes:</strong> {report.downvotes}
      </Typography>
      <Typography variant="body2" width="fit-content">
        <strong>Reported by:</strong> {report[0]}
      </Typography>
      <Stack
        display="flex"
        justifyContent={{ xs: "center", md: "space-between" }}
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Button variant="outlined" onClick={handleUpvote}>
          Upvote
        </Button>
        <Button variant="outlined" onClick={handleDownvote}>
          Downvote
        </Button>
      </Stack>
    </Popup>
  );
};
