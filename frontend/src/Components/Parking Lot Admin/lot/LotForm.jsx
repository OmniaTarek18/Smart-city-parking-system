import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Typography,
  Slider,
  InputAdornment,
  Alert,
} from "@mui/material";
import {
  LocationOn,
  LocalParking,
  AccessibleForward,
  EvStation,
  AttachMoney,
} from "@mui/icons-material";
import { validateLotForm } from "../../../utils/validation";

const LotForm = ({ open, onClose, onSubmit, editingLot }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: {
      regular: 0,
      disabled: 0,
      evCharging: 0,
    },
    pricing: {
      regular: { baseRate: 0, congestionRate: 0 },
      disabled: { baseRate: 0, congestionRate: 0 },
      evCharging: { baseRate: 0, congestionRate: 0 },
    },
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (editingLot) {
      setFormData({
        name: editingLot.name,
        location: editingLot.locationStr,
        capacity: {
          regular: editingLot.capacity_regular,
          disabled: editingLot.capacity_handicap,
          evCharging: editingLot.capacity_ev,
        },
        pricing: {
          regular: {
            baseRate: editingLot.baseRate_regular,
            congestionRate: editingLot.congestionRate_regular,
          },
          disabled: {
            baseRate: editingLot.baseRate_handicap,
            congestionRate: editingLot.congestionRate_handicap,
          },
          evCharging: {
            baseRate: editingLot.baseRate_ev,
            congestionRate: editingLot.congestionRate_ev,
          },
        },
      });
      setErrors({});
      setTouched({});
    } else {
      setFormData({
        name: "",
        location: "",
        capacity: { regular: 0, disabled: 0, evCharging: 0 },
        pricing: {
          regular: { baseRate: 0, congestionRate: 0 },
          disabled: { baseRate: 0, congestionRate: 0 },
          evCharging: { baseRate: 0, congestionRate: 0 },
        },
      });
    }
  }, [editingLot]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleNestedChange = (parentField, childField, value) => {
    setFormData((prev) => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: value,
      },
    }));
    setTouched((prev) => ({ ...prev, [parentField]: true }));
  };

  const handleSubmit = () => {
    const validationErrors = validateLotForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData); // pass to parent
      setFormData({
        name: "",
        location: "",
        capacity: { regular: 0, disabled: 0, evCharging: 0 },
        pricing: {
          regular: { baseRate: 0, congestionRate: 0 },
          disabled: { baseRate: 0, congestionRate: 0 },
          evCharging: { baseRate: 0, congestionRate: 0 },
        },
      });
      setErrors({});
      setTouched({});
      onClose();
    } else {
      setErrors(validationErrors);
      setTouched(
        Object.keys(validationErrors).reduce(
          (acc, key) => ({
            ...acc,
            [key]: true,
          }),
          {}
        )
      );
    }
  };

  const hasError = (field) => touched[field] && errors[field];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          bgcolor: "primary.main",
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <LocalParking />
        {editingLot ? "Edit Parking Lot" : "Add New Parking Lot"}
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        {Object.keys(errors).length > 0 && touched.form && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Please correct the errors before submitting
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Lot Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              error={hasError("name")}
              helperText={hasError("name") ? errors.name : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalParking />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              error={hasError("location")}
              helperText={hasError("location") ? errors.location : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Capacity
            </Typography>
            {hasError("capacity") && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.capacity}
              </Alert>
            )}
          </Grid>

          <Grid item xs={4}>
            <Typography gutterBottom>
              <LocalParking /> Regular Spots
            </Typography>
            <Slider
              value={formData.capacity.regular}
              onChange={(_, value) =>
                handleNestedChange("capacity", "regular", value)
              }
              min={0}
              max={100}
              valueLabelDisplay="auto"
            />
          </Grid>

          <Grid item xs={4}>
            <Typography gutterBottom>
              <AccessibleForward /> Disabled Spots
            </Typography>
            <Slider
              value={formData.capacity.disabled}
              onChange={(_, value) =>
                handleNestedChange("capacity", "disabled", value)
              }
              min={0}
              max={20}
              valueLabelDisplay="auto"
            />
          </Grid>

          <Grid item xs={4}>
            <Typography gutterBottom>
              <EvStation /> EV Charging Spots
            </Typography>
            <Slider
              value={formData.capacity.evCharging}
              onChange={(_, value) =>
                handleNestedChange("capacity", "evCharging", value)
              }
              min={0}
              max={30}
              valueLabelDisplay="auto"
            />
          </Grid>

          {["regular", "disabled", "evCharging"].map((type) => (
            <React.Fragment key={type}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Pricing Structure:{" "}
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Base Rate ($/hour)"
                  value={formData.pricing[type].baseRate}
                  onChange={(e) =>
                    handleNestedChange("pricing", type, {
                      ...formData.pricing[type],
                      baseRate: parseFloat(e.target.value) || 0,
                    })
                  }
                  error={hasError(`${type}.baseRate`)}
                  helperText={
                    hasError(`${type}.baseRate`)
                      ? errors[`${type}.baseRate`]
                      : ""
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoney />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Congestion Rate (%)"
                  value={formData.pricing[type].congestionRate}
                  onChange={(e) =>
                    handleNestedChange("pricing", type, {
                      ...formData.pricing[type],
                      congestionRate: parseFloat(e.target.value) || 0,
                    })
                  }
                  error={hasError(`${type}.congestionRate`)}
                  helperText={
                    hasError(`${type}.congestionRate`)
                      ? errors[`${type}.congestionRate`]
                      : ""
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{ minWidth: 100 }}
        >
          {editingLot ? "Update" : "Add"} Lot
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LotForm;
