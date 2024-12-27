import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { RadioGroup, FormControlLabel, Radio, colors } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
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
  // const [options, setOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    console.log(selected);
  };
  const handleSpotTypeChange = (event) => {
    setSelectedType(event.target.value);
    console.log("Selected spot type:", event.target.value);
  };
  const customDropdownIndicator = () => {
    return (
      <SearchIcon
        style={{
          fontSize: "24px",
          color: "gray",
          margin: 15,
          cursor: "pointer",
        }}
        onClick={() => navigate("/user-home-page/display-lots")}
      />
    );
  };

  return (
    <div>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder="Search location"
        className="select-dropdown"
        components={{
          DropdownIndicator: customDropdownIndicator, // Replace dropdown icon with search icon
        }}
      />
      <RadioGroup
        row
        name="spot Type"
        value={selectedType}
        onChange={handleSpotTypeChange}
        sx={{
          display: "flex",         
          justifyContent: "space-evenly", 
          alignItems: "center",    
        }}      >
        <FormControlLabel
          value="regular"
          control={<Radio />}
          label="Regular"
          sx={{ color: "white" }}
        />
        <FormControlLabel
          value="disabled"
          control={<Radio />}
          label="Disabled"
          sx={{ color: "white" }}
        />
        <FormControlLabel
          value="EVcharging"
          control={<Radio />}
          label="EV Charging"
          sx={{ color: "white" }}
        />
      </RadioGroup>
    </div>
  );
};

export default LocationSearch;
