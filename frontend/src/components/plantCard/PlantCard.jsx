import { useState } from "react";
import { cartStore } from "../../stores/useCartStore";
import { Link } from "react-router-dom";
import { Button } from "../../components/buttons/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export const PlantCard = ({ plants }) => {
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
          <div key={plant._id}>
            <div className="plant-card">
              <img
                className="preview-plant-img"
                src={plant.images.full_size_url}
                alt={plant.plant_title}
              />
              <div className="product-overlay">
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
