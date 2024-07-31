import React, { useState, useEffect } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { Typography, Stack, Divider, Box } from "@mui/material";
import RouteOutlinedIcon from "@mui/icons-material/RouteOutlined";
import { Icon } from "leaflet";
import { Map, AddAlert, PopupAlert, CustomThemeProvider } from "../index";
import { fetchReports } from "../../Functions/Reports";

const alertIcon = new Icon({
  iconUrl:
    "https://upload.wikimedia.org/wikipedia/commons/c/cf/Warning_FFStyle.png",
  iconSize: [30, 30], // size of the icon
});

function App() {
  const [location, setLocation] = useState(null);
  const [reports, setReports] = useState([]);

  function LocationClickHandler() {
    // This hook allows us to listen to events on the map
    useMapEvents({
      click(event) {
        setLocation(event.latlng);
      },
    });
    return null;
  }

  useEffect(() => {
    fetchReports(setReports);
  }, []);

  return (
    <CustomThemeProvider>
      <Stack className="App">
        <Stack
          display="flex"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
          my={{ xs: 2, md: 0.5 }}
        >
          <RouteOutlinedIcon fontSize="medium" sx={{ color: "green" }} />
          <Typography variant="h3" fontWeight="bold" sx={{ color: "#1976d2" }}>
            Drive Alerts
          </Typography>
        </Stack>
        <Divider variant="middle" sx={{ borderColor: "gray", mb: 1 }} />
        <Box mx={2}>
          <Map>
            <LocationClickHandler />
            {location && (
              <Marker position={location}>
                <Popup>
                  Selected Location
                  <br />
                  Latitude: {location.lat}
                  <br />
                  Longitude: {location.lng}
                </Popup>
              </Marker>
            )}
            <Stack>
              {reports.map((report, index) => {
                return (
                  <Marker
                    key={index}
                    position={{
                      lat: report.location.lat,
                      lng: report.location.lng,
                    }}
                    icon={alertIcon}
                  >
                    <PopupAlert
                      report={report}
                      index={index}
                      setReports={setReports}
                    />
                  </Marker>
                );
              })}
            </Stack>
          </Map>
        </Box>

        <AddAlert location={location} setReports={setReports} />
      </Stack>
    </CustomThemeProvider>
  );
}

export default App;
