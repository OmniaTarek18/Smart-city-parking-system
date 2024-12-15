import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
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
  // const [options, setOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    console.log(selected);
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
  );
};

export default LocationSearch;
