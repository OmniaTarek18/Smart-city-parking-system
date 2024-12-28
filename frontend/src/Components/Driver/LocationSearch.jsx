import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./dataPicker.css";
import { useData } from "../../Context/DataContext";
const options = [
  { value: [31.2156, 29.9553], label: "Alexandria" }, // Alexandria
  { value: [31.2156, 29.9355], label: "Stanley" }, // Stanley, Alexandria
  { value: [31.2343, 29.9708], label: "Raml Station" }, // Raml Station, Alexandria
  { value: [31.2068, 29.9006], label: "Montaza" }, // Montaza, Alexandria
  { value: [31.241, 29.9689], label: "Mansheya" }, // Mansheya, Alexandria
];

const LocationSearch = () => {
  const { data, setData } = useData();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedType, setSelectedType] = useState("REGULAR");
  const [startTime, setStartTime] = useState(new Date());
  const [duration, setDuration] = useState({ hours: 0, minutes: 0 });

  const handleLocationChange = (selected) => {
    setSelectedOption(selected);
  };

  const handleSpotTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleStartTimeChange = (date) => {
    setStartTime(date);
  };

  const handleDurationChange = (e) => {
    const [hours, minutes] = e.target.value.split(":");
    setDuration({ hours: parseInt(hours), minutes: parseInt(minutes) });
  };

  const handleSubmit = () => {
    setData({
      locationCoor: {
        latitude: selectedOption.value[0],
        longitude: selectedOption.value[1],
      },
      spotType: selectedType,
      startTime: startTime,
      duration: `${String(duration.hours).padStart(2, "0")}:${String(
        duration.minutes
      ).padStart(2, "0")}:00`,
    });
    // console.log(data);
    navigate("/user-home-page/display-lots");
  };

  useEffect(() => {
    console.log("Data updated:", data);
  }, [data]);
  const customDropdownIndicator = () => (
    <SearchIcon
      style={{
        fontSize: "24px",
        color: "gray",
        margin: 15,
        cursor: "pointer",
      }}
    />
  );

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "10px",
        boxShadow: 3,
        maxWidth: "550px",
        margin: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.45)",
      }}
    >
      <Select
        value={selectedOption}
        onChange={handleLocationChange}
        options={options}
        placeholder="Search location"
        className="mb-4"
        components={{
          DropdownIndicator: customDropdownIndicator,
        }}
        styles={{
          control: (base) => ({ ...base, padding: "5px", borderRadius: "8px" }),
        }}
      />

      <div className="time-row-container">
        <div
          className="custom-datepicker"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "20px",
            width: "240px",
          }}
        >
          <DatePicker
            selected={startTime}
            onChange={handleStartTimeChange}
            showTimeSelect
            dateFormat="Pp"
            minDate={new Date()}
            customInput={
              <TextField
                label="From"
                variant="outlined"
                fullWidth
                sx={{ zIndex: 0 }}
              />
            }
          />
        </div>
        <TextField
          label="Duration (HH:MM)"
          type="text"
          name="duration"
          value={`${String(duration.hours).padStart(2, "0")}:${String(
            duration.minutes
          ).padStart(2, "0")}`}
          onChange={handleDurationChange}
          sx={{ width: "240px", marginBottom: "20px", zIndex: 0 }}
        />
      </div>

      <RadioGroup
        row
        name="spot Type"
        value={selectedType}
        onChange={handleSpotTypeChange}
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <FormControlLabel
          value="REGULAR"
          control={<Radio />}
          label="Regular"
          sx={{ color: "black" }}
        />
        <FormControlLabel
          value="HANDICAP"
          control={<Radio />}
          label="Disabled"
          sx={{ color: "black" }}
        />
        <FormControlLabel
          value="EV"
          control={<Radio />}
          label="EV Charging"
          sx={{ color: "black" }}
        />
      </RadioGroup>

      <Button
        variant="contained"
        color="primary"
        className="p-2"
        style={{ marginTop: "10px", backgroundColor: "#3f51b5" }}
        fullWidth
        onClick={handleSubmit}
      >
        Show Parking Spaces
      </Button>
    </div>
  );
};

export default LocationSearch;
