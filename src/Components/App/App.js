import React, { useState, useEffect } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { Typography, Stack } from "@mui/material";
import RouteOutlinedIcon from "@mui/icons-material/RouteOutlined";
import { Icon } from "leaflet";
import { Map, AddAlert, PopupAlert, CustomThemeProvider } from "../index";
import { fetchReports } from "../../Functions/Reports";

const universityLocation = {
  lat: 9.931077154575341,
  lng: -84.06439483165742,
};

const alertIcon = new Icon({
  iconUrl: "https://img.icons8.com/?size=100&id=42854&format=png&color=000000",
  /* iconUrl:
    "https://upload.wikimedia.org/wikipedia/commons/f/f6/OOjs_UI_icon_alert-destructive.svg", */
  iconSize: [40, 40], // size of the icon
});

const universityIcon = new Icon({
  iconUrl:
    "https://img.icons8.com/?size=100&id=NMFIa3X8I5RT&format=png&color=000000",
  iconSize: [40, 40], // size of the icon
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
      <Stack className="App" mx={2} my={2}>
        <Stack
          display="flex"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
          mb={1}
        >
          <RouteOutlinedIcon fontSize="medium" sx={{ color: "green" }} />
          <Typography variant="h3" fontWeight="bold">
            Drive Alerts
          </Typography>
        </Stack>
        <Map>
          <Marker position={universityLocation} icon={universityIcon}>
            <Popup>
              <Typography variant="h6">CENFOTEC</Typography>
            </Popup>
          </Marker>
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
        <AddAlert location={location} setReports={setReports} />
      </Stack>
    </CustomThemeProvider>
  );
}

export default App;
