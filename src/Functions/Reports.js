import TrafficData from "drive-alerts-artifacts/contracts/TrafficData.sol/TrafficData.json";
const trafficDataAddress = "0x72A2a5106cFdfC55D2BADC4e3cea3B7E3484027B";

/* window.ethereum is a global variable injected by MetaMask
Provider is an object that allows you to interact with the Ethereum network
Signer is an object that allows you to sign transactions
Contract is an object that allows us to interact with our smart contract */

const { ethers } = require("ethers");

export async function fetchReports(setReports) {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
      trafficDataAddress,
      TrafficData.abi,
      provider
    );
    try {
      const data = await contract.getReports();
      const normalizedData = data.map((report) => ({
        ...report,
        location: {
          // Convert int to float
          lat: Number(report.location.lat) / 1000000,
          lng: Number(report.location.lng) / 1000000,
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

export async function addReport(
  location,
  description,
  setDescription,
  setReports
) {
  console.log(location, description);
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
      const lat = Math.floor(location.lat * 1e6); // Convert to integer (Ej. 6 decimals)
      const lng = Math.floor(location.lng * 1e6); // Convert to integer (Ej. 6 decimals)
      const transaction = await contract.addReport(lat, lng, description);
      await transaction.wait();
      fetchReports(setReports);
      setDescription("");
    } catch (err) {
      console.log("Error: ", err);
    }
  }
}

export async function upvoteReport(index, setReports) {
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
      fetchReports(setReports);
    } catch (err) {
      console.log("Error: ", err);
    }
  }
}

export async function downvoteReport(index, setReports) {
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
      fetchReports(setReports);
    } catch (err) {
      console.log("Error: ", err);
    }
  }
}
