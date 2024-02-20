import { useState } from "react";
import { cartStore } from "../../stores/useCartStore";
import { Link } from "react-router-dom";
import { Button } from "../../components/buttons/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { MdKeyboardArrowRight } from "react-icons/md";
import "./PlantCards.css";

export const PlantCardMini = ({ plants, position }) => {
  const { addToCart } = cartStore();

  // state for handling snackbar alert message
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // function for closing snackbar
  const handleSnackbarClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleAddToCart = (plant) => {
    addToCart(plant);
    setSnackbarOpen(true);
  };

  return (
    <>
      {plants.map((plant) => {
        return (
          <div
            className="plant-card-mini"
            key={plant._id}
            style={{ position: "absolute", ...position }}
          >
            <Link to={`/plants/${plant._id}`} aria-label="Go to product page">
              <div className="mini-link-container">
                <div className="title-price-container-mini">
                  <h3 className="card-name">{plant.plant_title}</h3>
                  <span className="card-price">€{plant.price}</span>
                </div>
                <MdKeyboardArrowRight className="forward-icon" />
              </div>
            </Link>
            <Button
              className="hover-btn-add"
              btnText="add to cart"
              ariaLabel="Add this product to cart"
              onClick={() => handleAddToCart(plant)}
            />
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              open={snackbarOpen}
              autoHideDuration={3000}
              onClose={handleSnackbarClose}
            >
              <MuiAlert
                onClose={handleSnackbarClose}
                severity="success"
                sx={{
                  width: "100%",
                  backgroundColor: "#3f543f",
                  color: "#f3f3ea",
                  "& .MuiSvgIcon-root": {
                    fill: "#f3f3ea",
                  },
                }}
              >
                Plant added to cart!
              </MuiAlert>
            </Snackbar>
          </div>
        );
      })}
    </>
  );
};
