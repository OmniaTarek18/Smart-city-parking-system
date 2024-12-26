import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  MenuItem,
  Typography,
  Button,
  colors,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";

const options = [
  { value: "new york", label: "New York" },
  { value: "los angeles", label: "Los Angeles" },
  { value: "chicago", label: "Chicago" },
  { value: "houston", label: "Houston" },
  { value: "miami", label: "Miami" },
  // Add more locations as needed
];

const LocationSearch = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedType, setSelectedType] = useState("regular");
  const [startTime, setStartTime] = useState(new Date());
  const [duration, setDuration] = useState({ hours: 0, minutes: 0 });

  const handleLocationChange = (selected) => {
    setSelectedOption(selected);
    console.log(selected);
  };

  const handleSpotTypeChange = (event) => {
    setSelectedType(event.target.value);
    console.log("Selected spot type:", event.target.value);
  };

  const handleStartTimeChange = (date) => {
    setStartTime(date);
  };

  const handleDurationChange = (e) => {
    const [hours, minutes] = e.target.value.split(":");
    setDuration({ hours: parseInt(hours), minutes: parseInt(minutes) });
  };

  const handleSubmit = () => {
    console.log("Location:", selectedOption);
    console.log("Spot Type:", selectedType);
    console.log("Start Time:", startTime);
    console.log("Duration:", duration);
    navigate("/user-home-page/display-lots");
  };

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

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label="From"
          value={startTime}
          onChange={handleStartTimeChange}
          disablePast
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              sx={{ backgroundColor: "white" }}
            />
          )}
          sx={{marginRight: "50px"}}
        />

        <TextField
          label="Duration (HH:MM)"
          type="time"
          name="duration"
          value={`${String(duration.hours).padStart(2, "0")}:${String(
            duration.minutes
          ).padStart(2, "0")}`}
          onChange={handleDurationChange}
          sx={{ width: "200px" }}
        />
      </LocalizationProvider>

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
          value="regular"
          control={<Radio />}
          label="Regular"
          sx={{ color: "black" }}
        />
        <FormControlLabel
          value="disabled"
          control={<Radio />}
          label="Disabled"
          sx={{ color: "black" }}
        />
        <FormControlLabel
          value="EVcharging"
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
