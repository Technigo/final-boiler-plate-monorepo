import { useState } from "react";
import { favouriteStore } from "../../stores/favouriteStore";
import { cartStore } from "../../stores/cartStore";
import { Link } from "react-router-dom";
import { PiHeartStraightFill } from "react-icons/pi";
import { Button } from "../../components/buttons/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export const PlantCard = ({ plants, position }) => {
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

  console.log("plants", plants);
  return (
    <>
      {plants.map((plant) => {
        return (
          <div key={plant._id}>
            <div className="plant-card">
              <img
                className="preview-plant-img"
                src={plant.images.full_size_url}
                alt={plant.plant_title}
              />
              <div className="product-overlay">
                <PiHeartStraightFill
                  className="like-icon"
                  onClick={() => handleAddFavourite(plant._id)}
                />
                <div className="btns-hover-wrapper">
                  <div className="btns-hover-container">
                    <Link
                      to={`/plants/${plant._id}`}
                      className="hover-btn-more"
                    >
                      more info
                    </Link>
                    <Button
                      className="hover-btn-add"
                      btnText="add to cart"
                      ariaLabel="More info button"
                      onClick={() => handleAddToCart(plant)}
                    />
                  </div>
                </div>
                <Link to={`/plants/${plant._id}`}>
                  <div className="title-price-container">
                    <h3 className="card-name">{plant.plant_title}</h3>
                    <span className="card-price">€{plant.price}</span>
                  </div>
                </Link>
              </div>
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
          </div>
        );
      })}
    </>
  );
};
