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

const GoogleMap = ({ lotId }) => {
  const mapRef = React.useRef();
  const [route, setRoute] = useState([]);
  const [liveLocation, setLiveLocation] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [destination, setDestination] = useState(null); // Set destination as null initially

  const icon = new Icon({
    iconUrl: mapMarker,
    iconSize: [38, 38],
  });

  const fetchRoute = async (origin) => {
    if (!origin || !destination) return;

    const options = {
      method: "GET",
      url: "https://google-map-places.p.rapidapi.com/maps/api/directions/json",
      params: {
        origin: `${origin[0]},${origin[1]}`, // Current location (driver's location)
        destination: `${destination[0]},${destination[1]}`, // Parking lot location
        mode: "driving",
        language: "en",
        alternatives: "true",
        units: "metric",
        avoid: "ferries|tolls|highways",
      },
      headers: {
        // uncomment the following lines to use the API
        // "x-rapidapi-key": "cb20e416d3msha4c774e94db4ed3p138ebfjsn3b0d73722384",
        // "x-rapidapi-host": "google-map-places.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);

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
    }
  }, [liveLocation, destination]);

  return (
    <div>
      <h1>Live Directions Map</h1>
      {destination && (
        <MapContainer
          center={destination}
          zoom={15}
          style={{ height: "80vh", width: "70%", margin: "auto" }}
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
          {route.length > 0 && <Polyline positions={route} color="#4C585B" />}
        </MapContainer>
      )}
    </div>
  );
};

export default GoogleMap;
