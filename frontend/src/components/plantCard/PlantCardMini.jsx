import { useState } from "react";
import { favouriteStore } from "../../stores/favouriteStore";
import { cartStore } from "../../stores/cartStore";
import { Link } from "react-router-dom";
import { PiHeartStraightFill } from "react-icons/pi";
import { Button } from "../../components/buttons/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { MdKeyboardArrowRight } from "react-icons/md";
import "./PlantCards.css";

export const PlantCardMini = ({ plants, position }) => {
  const { addToFavourites } = favouriteStore();
  const { addToCart, cart } = cartStore();

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleAddFavourite = (plantId) => {
    addToFavourites(plantId);
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
            <Link to={`/plants/${plant._id}`}>
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
              ariaLabel="More info button"
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
