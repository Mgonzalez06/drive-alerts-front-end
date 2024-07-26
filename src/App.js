import React, { useState, useEffect } from "react";
/* import { ethers } from 'ethers'; */
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Button, Typography, TextField, Stack } from "@mui/material";
import RouteOutlinedIcon from "@mui/icons-material/RouteOutlined";
/* import 'leaflet/dist/leaflet.css';
import TrafficData from './artifacts/contracts/TrafficData.sol/TrafficData.json'; */

const trafficDataAddress = "DIRECCION_DEL_CONTRATO_DESPLEGADO";

const center = {
  lat: -3.745,
  lng: -38.523,
};

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

  /*  useEffect(() => {
    fetchReports();
  }, []); */

  /*   async function fetchReports() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(trafficDataAddress, TrafficData.abi, provider);
      try {
        const data = await contract.getReports();
        setReports(data);
      } catch (err) {
        console.log('Error: ', err);
      }
    }
  } */

  async function addReport() {
    console.log("Location: ", location);
    /*   if (!location || !description) return;
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(trafficDataAddress, TrafficData.abi, signer);
      try {
        const transaction = await contract.addReport(`${location.lat},${location.lng}`, description);
        await transaction.wait();
        fetchReports();
      } catch (err) {
        console.log('Error: ', err);
      }
    } */
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
        zoom={10}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
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
        {reports.map((report, index) => {
          const [lat, lng] = report.location.split(",").map(Number);
          return (
            <Marker key={index} position={{ lat, lng }}>
              <Popup>
                <Typography variant="body1">
                  Location: {report.location}
                </Typography>
                <Typography variant="body1">
                  Description: {report.description}
                </Typography>
                <Typography variant="body1">
                  Reported by: {report.reporter}
                </Typography>
                <Typography variant="body1">
                  Timestamp:{" "}
                  {new Date(report.timestamp * 1000).toLocaleString()}
                </Typography>
              </Popup>
            </Marker>
          );
        })}
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
