import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const StyledDialogTitle = styled(DialogTitle)(() => ({
  backgroundColor: "#1976d2", // Primary color
  color: "#fff",
  padding: "8px",
  textAlign: "center",
  fontWeight: "bold",
}));

const ContentBox = styled(Box)(() => ({
  backgroundColor: "#fff",
  borderRadius: "8px",
  padding: "24px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  marginBottom: "16px",
}));

const CustomButton = styled(Button)(() => ({
  margin: "0 1rem 1rem 0",
  backgroundColor: "#1976d2", // Primary color
  color: "#fff",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#115293", // Darker shade on hover
  },
}));

const ReceiptPopup = ({ handleClose, open, lotId }) => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleBooking = () => {
    // Show a Snackbar indicating payment has been taken from Visa card
    setOpenSnackbar(true);

    // Delay navigation to allow the Snackbar to display
    setTimeout(() => {
      navigate(`/user-home-page/route-to-lot/${lotId}`);
    }, 3500); // Delay of 3 seconds to allow the Snackbar to be seen
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <StyledDialogTitle>Receipt for Parking Space</StyledDialogTitle>
        <DialogContent>
          <ContentBox>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Receipt Details:
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Item:</strong> Parking Space Reservation
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Price:</strong> $10.00
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Duration:</strong> 2 Hours
            </Typography>
          </ContentBox>

          <Typography variant="h6" sx={{ fontWeight: "bold", color: "red", mt: 2 }}>
            Rules and Terms:
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            1. Parking spaces are available on a first-come, first-served basis.
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            2. No refunds after booking confirmation.
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            3. Violations of parking rules may result in fines.
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            4. Ensure that the parking space is vacated within the booked duration.
          </Typography>
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={handleBooking}>Confirm Payment</CustomButton>
          <CustomButton onClick={handleClose} sx={{ backgroundColor: "#6C757D" }}>
            Close
          </CustomButton>
        </DialogActions>
      </Dialog>

      {/* Snackbar for styled payment confirmation */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3500} // Automatically hide after 3 seconds
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Move snackbar to top
        sx={{ marginTop: "60px" }} // Add space between dialog and snackbar
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%", backgroundColor: "#4caf50" }}
        >
          Amount of $10.00 has been taken from your Visa card. Redirecting driver to Map...
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReceiptPopup;
