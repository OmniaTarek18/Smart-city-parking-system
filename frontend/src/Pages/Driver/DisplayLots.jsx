import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "@mui/material";
import { useData } from "../../Context/DataContext";
import { displayLotsAPI } from "./DisplayLotsAPI";
import ReceiptPopup from "./ReceiptPopup";

const DisplayLots = () => {
  const { data } = useData();
  const [parkingLots, setParkingLots] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // State to track if more data exists
  const [lotId, setLotId] = useState(null);
  const [open, setOpen] = useState(false);
  const [cost, setCost] = useState(null);
  const handleOpen = (id, cost) => {
    setLotId(id);
    setCost(cost);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchLots = async () => {
      const json = {
        location: data.locationCoor,
        spotType: data.spotType,
      };

      try {
        const newLots = await displayLotsAPI(json, currentPage);
        if (newLots.length === 0) {
          setHasMore(false); // If no more data, stop fetching
        } else {
          setParkingLots((prev) => [...prev, ...newLots]); // Append new data
        }
      } catch (error) {
        console.error("Error fetching parking lots:", error);
      }
    };

    fetchLots();
  }, [currentPage, data]);

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <Container className="mt-5">
      <ReceiptPopup handleClose={handleClose} open={open} lotId={lotId} cost={cost}/>
      <h2 className="text-center mb-4">Available Parking Lots</h2>
      <div className="row">
        {parkingLots.map((lot) => (
          <div key={lot.parkingLotId} className="col-6 mb-4">
            <Card
              sx={{
                padding: "1.5rem",
                borderRadius: "8px",
                boxShadow: 2,
                textAlign: "center",
                transition: "0.3s",
                "&:hover": { boxShadow: 5 },
              }}
            >
              <h4 className="mb-3">{lot.name}</h4>
              {/* <p className="text-secondary mb-2">
                <strong>Location:</strong> {lot.location}
              </p> */}
              <p className="text-secondary mb-2">
                <strong>Price:</strong> {lot.cost}$/hr
              </p>
              <p className="text-success mb-4">
                <strong>Congestion Added Percentage:</strong>{" "}
                {lot.congestionAddedPercent}%
              </p>

              <Button
                variant="contained"
                color="primary"
                className="w-100"
                sx={{ borderRadius: "20px" }}
                onClick={() => handleOpen(lot.parkingLotId, lot.cost)}
              >
                Book Now
              </Button>
            </Card>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="contained"
            color="primary"
            onClick={loadMore}
            style={{ margin: "1rem" }}
          >
            Load More
          </Button>
        </div>
      )}
    </Container>
  );
};

export default DisplayLots;
