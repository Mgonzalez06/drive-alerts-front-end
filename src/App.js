import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Button, Typography, TextField, Stack } from "@mui/material";
import RouteOutlinedIcon from "@mui/icons-material/RouteOutlined";
import TrafficData from "drive-alerts-artifacts/contracts/TrafficData.sol/TrafficData.json";
import { Icon } from "leaflet";
const trafficDataAddress = "0x72A2a5106cFdfC55D2BADC4e3cea3B7E3484027B";

const center = {
  lat: 9.930468664302493,
  lng: -84.07751083374025,
};

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

function LocationClickHandler({ setLocation }) {
  useMapEvents({
    click(event) {
      setLocation(event.latlng);
    },
  });
  return null;
}

function App() {
  const [reports, setReports] = useState([]);
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState("");
  const { ethers } = require("ethers");

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        trafficDataAddress,
        TrafficData.abi,
        provider
      );
      try {
        const data = await contract.getReports();
        // Convertir BigInt a número normal si es necesario
        const normalizedData = data.map((report) => ({
          ...report,
          location: {
            lat: Number(report.location.lat) / 1000000, // Desescalar latitud
            lng: Number(report.location.lng) / 1000000, // Desescalar longitud
          },
          upvotes: Number(report.upvotes),
          downvotes: Number(report.downvotes),
          timestamp: Number(report.timestamp),
        }));

        setReports(normalizedData);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function addReport() {
    if (!location || !description) return;
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        trafficDataAddress,
        TrafficData.abi,
        signer
      );

      try {
        const lat = Math.floor(location.lat * 1e6); // Convertir a entero (Ej. 6 decimales)
        const lng = Math.floor(location.lng * 1e6); // Convertir a entero (Ej. 6 decimales)
        const transaction = await contract.addReport(lat, lng, description);
        await transaction.wait();
        fetchReports();
        setDescription("");
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function upvoteReport(index) {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        trafficDataAddress,
        TrafficData.abi,
        signer
      );
      try {
        const transaction = await contract.upvoteReport(index);
        await transaction.wait();
        fetchReports();
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function downvoteReport(index) {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        trafficDataAddress,
        TrafficData.abi,
        signer
      );
      try {
        const transaction = await contract.downvoteReport(index);
        await transaction.wait();
        fetchReports();
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  return (
    <Stack className="App" mx={2} my={2}>
      <Stack display="flex" justifyContent="center" flexDirection="row">
        <RouteOutlinedIcon fontSize="large" />
        <Typography variant="h4" fontWeight="bold">
          Traffic Data
        </Typography>
      </Stack>
      <MapContainer
        center={center}
        zoom={15}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={universityLocation} icon={universityIcon}>
          <Popup>
            <Typography variant="h6">University of Costa Rica</Typography>
          </Popup>
        </Marker>
        <LocationClickHandler setLocation={setLocation} />
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
                position={{
                  lat: report.location.lat,
                  lng: report.location.lng,
                }}
                icon={alertIcon}
              >
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
                  <Typography variant="body3" width="fit-content">
                    <strong>Reported by:</strong> {report[0]}
                  </Typography>
                  <Stack
                    display="flex"
                    justifyContent={{ xs: "center", md: "space-between" }}
                    flexDirection={{ xs: "column", md: "row" }}
                  >
                    <Button onClick={() => upvoteReport(index)}>Upvote</Button>
                    <Button onClick={() => downvoteReport(index)}>
                      Downvote
                    </Button>
                  </Stack>
                </Popup>
              </Marker>
            );
          })}
        </Stack>
      </MapContainer>
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
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          variant="outlined"
          onClick={addReport}
          sx={{ mt: { xs: 2, md: 0 } }}
        >
          Add Report
        </Button>
      </Stack>
    </Stack>
  );
}

export default App;
