import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  Circle,
} from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import mapMarker from "../../assets/marker.png";
import { lotLocationAPI } from "./api";
import decodePolyline from "decode-google-map-polyline";
import { useParams, useNavigate } from "react-router-dom";
import { LinearProgress, Box, Typography } from "@mui/material";

const GoogleMap = () => {
  const { lotId } = useParams();
  const mapRef = React.useRef();
  const navigate = useNavigate();
  const [route, setRoute] = useState([]);
  const [liveLocation, setLiveLocation] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [destination, setDestination] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10); // 15 minutes in seconds
  const [timerRunning, setTimerRunning] = useState(true);
  const [isDriverNear, setIsDriverNear] = useState(false); // To check if the driver has arrived

  const icon = new Icon({
    iconUrl: mapMarker,
    iconSize: [38, 38],
  });

  const calculateDistance = (loc1, loc2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371e3; // Earth's radius in meters
    const lat1 = toRad(loc1[0]);
    const lat2 = toRad(loc2[0]);
    const deltaLat = toRad(loc2[0] - loc1[0]);
    const deltaLon = toRad(loc2[1] - loc1[1]);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  };

  const fetchRoute = async (origin) => {
    if (!origin || !destination) return;

    const options = {
      method: "GET",
      url: "https://google-map-places.p.rapidapi.com/maps/api/directions/json",
      params: {
        origin: `${origin[0]},${origin[1]}`,
        destination: `${destination[0]},${destination[1]}`,
        mode: "driving",
        language: "en",
        alternatives: "true",
        units: "metric",
        avoid: "ferries|tolls|highways",
      },
      headers: {
        // Uncomment the following lines to use the API
        // "x-rapidapi-key": "your-api-key",
        // "x-rapidapi-host": "google-map-places.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const encodedPolyline = response.data.routes[0].overview_polyline.points;
      const decodedRoute = decodePolyline(encodedPolyline);
      setRoute(decodedRoute);
    } catch (error) {
      console.error("Error fetching route data:", error);
    }
  };

  const fetchLiveLocation = () => {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      const accuracy = position.coords.accuracy;
      setAccuracy(accuracy);
      setLiveLocation([latitude, longitude]);
    };
    const error = (error) => {
      console.error("Error getting live location:", error);
    };
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };
    navigator.geolocation.watchPosition(success, error, options);
  };

  const startTimer = () => {
    if (timerRunning && timeLeft > 0) {
      setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      alert("No show up. Redirecting to home...");
      navigate("/user-home-page/search");
    }
  };

  useEffect(() => {
    const getDestination = async () => {
      const location = await lotLocationAPI(lotId);
      setDestination(location);
    };
    getDestination();
    fetchLiveLocation();
  }, [lotId]);

  useEffect(() => {
    if (liveLocation && destination) {
      fetchRoute(liveLocation);

      // Check if the driver is near the destination
      const distance = calculateDistance(liveLocation, destination);
      if (distance <= 50) {
        setIsDriverNear(true);
      }
    }
  }, [liveLocation, destination]);

  useEffect(() => {
    startTimer();
  }, [timeLeft, timerRunning]);

  useEffect(() => {
    if (isDriverNear) {
      alert("You have reached the destination. Remaining amount has been taken.");
      navigate("/user-home-page/search"); // Redirect to home page
    }
  }, [isDriverNear]);

  const percentage = (timeLeft / 10) * 100;

  return (
    <div>
      {/* Timer Bar */}
      <Box sx={{ width: "100%", zIndex: 10 }}>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            backgroundColor: "#1976d2",
            height: "3rem",
            padding: "1rem",
            color: "white",
          }}
        >
          Time Remaining: {Math.floor(timeLeft / 60)}:
          {timeLeft % 60 < 10 ? "0" : ""}
          {timeLeft % 60}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: 10,
            backgroundColor: "#ddd",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#1976d2",
            },
          }}
        />
      </Box>

      {destination && (
        <MapContainer
          center={destination}
          zoom={15}
          style={{ height: "85vh", width: "100%" }}
          whenCreated={(mapInstance) => {
            mapRef.current = mapInstance;
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {liveLocation && (
            <Circle
              center={liveLocation}
              radius={accuracy}
              color="blue"
              opacity={0.5}
            />
          )}
          {liveLocation && (
            <Marker position={liveLocation} icon={icon}>
              <Popup>Driver's Location</Popup>
            </Marker>
          )}
          {destination && (
            <Marker position={destination} icon={icon}>
              <Popup>Parking Lot Location</Popup>
            </Marker>
          )}
          {route.length > 0 && <Polyline positions={route} color="black" />}
        </MapContainer>
      )}
    </div>
  );
};

export default GoogleMap;

