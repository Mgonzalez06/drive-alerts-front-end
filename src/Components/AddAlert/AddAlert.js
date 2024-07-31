import React from "react";
import { Button, Stack, styled } from "@mui/material";
import { addReport } from "../../Functions/Reports";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CommuteRoundedIcon from "@mui/icons-material/CommuteRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";
import LandslideRoundedIcon from "@mui/icons-material/LandslideRounded";
import RemoveRoadRoundedIcon from "@mui/icons-material/RemoveRoadRounded";

const StyledStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "center",
  marginTop: theme.spacing(1),
  flexWrap: "wrap",
  gap: theme.spacing(0.5),

  "& > *": {
    flexBasis: "calc(35% - 10px)",
    margin: "2px",
  },

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    marginBottom: theme.spacing(1),

    "& > *": {
      flexBasis: "100%",
      width: "90%",
      margin: "2px 0",
    },
  },
}));

export const AddAlert = ({ location, setReports }) => {
  const handleAddReport = (description) => {
    addReport(location, description, setReports);
  };

  const options = [
    {
      icono: WarningAmberRoundedIcon,
      color: "red",
      texto: "Vehicle crash",
    },
    {
      icono: CommuteRoundedIcon,
      color: "blue",
      texto: "Traffic jam",
    },
    {
      icono: ConstructionRoundedIcon,
      color: "orange",
      texto: "Road construction",
    },
    {
      icono: LocalPoliceOutlinedIcon,
      color: "yellow",
      texto: "Police checkpoint",
    },
    {
      icono: RemoveRoadRoundedIcon,
      color: "black",
      texto: "Hole in the road",
    },
    {
      icono: LandslideRoundedIcon,
      color: "brown",
      texto: "Landslide on the road",
    },
  ];

  return (
    <StyledStack>
      {options.map((option, index) => (
        <Button
          key={index}
          variant="outlined"
          onClick={() => handleAddReport(option.texto)}
          sx={{ mt: { xs: 2, md: 0 } }}
        >
          <option.icono fontSize="small" sx={{ color: option.color }} />
          {option.texto}
        </Button>
      ))}
    </StyledStack>
  );
};
