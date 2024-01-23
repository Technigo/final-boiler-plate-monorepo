import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { plantStore } from "../../stores/usePlantStore";
import { cartStore } from "../../stores/useCartStore";
// importing components
import { Button } from "../../components/buttons/Button";
import { PlantCare } from "./sections/PlantCare";
// importing snackbar and icons and styling
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  MdOutlineLightMode,
  MdOutlineWaterDrop,
  MdOutlineHeight,
  MdKeyboardArrowLeft,
} from "react-icons/md";
import { PiPottedPlantDuotone } from "react-icons/pi";
import "./ProductPage.css";

export const ProductPage = () => {
  const { id } = useParams();
  // importing functions from stores
  const { singlePlant, setApiEndpoint, fetchSinglePlant } = plantStore();
  const { addToCart } = cartStore();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // fetching clicked plant using useParams, 
  // sending it to the fetchSinglePlant function in plantStore.
  useEffect(() => {
    setApiEndpoint(
      `https://plants-holm-witting-backend.onrender.com/api/plants/${id}`
    );
    fetchSinglePlant().catch((error) => {
      console.error("Error fetching plant details", error);
      setError(error);
    });
  }, [id, fetchSinglePlant]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleAddToCart = () => {
    addToCart(singlePlant);
    setSnackbarOpen(true);
  };

  return (
    <div className="product-page">
      <Link to="/plants/all-plants" className="go-back">
        <MdKeyboardArrowLeft className="go-back-icon" />
        Go back to all plants
      </Link>
      <div className="product-page-container">
        <div className="product-highlights-wrapper">
          <span className="botanical-name">{singlePlant.botanical_name}</span>
          <h1 className="plant-page-title">{singlePlant.plant_title}</h1>
          <span className="price">€{singlePlant.price}</span>
          <div className="plant-image-container">
            <img
              className="product-image"
              src={singlePlant.images && singlePlant.images.full_size_url}
              alt=""
            />
          </div>
          <Button
            className="add-to-cart-btn terracotta-btn"
            onClick={handleAddToCart}
            btnText="Add to Cart"
            ariaLabel="cart button"
          />
          <div className="plant-description-container">
            <span className="italic-style">{singlePlant.common_names}</span>
            <p
              style={
                showMore
                  ? null
                  : {
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      display: "-webkit-box",
                    }
              }
            >
              {singlePlant.description}
            </p>
            <span className="show-more" onClick={() => setShowMore(!showMore)}>
              {showMore ? "show less..." : "show more..."}
            </span>
          </div>
          <div className="details-container">
            <hr />
            <div className="plant-height">
              <div>
                <MdOutlineHeight className="details-icon" />
                <span>Height (incl. pot)</span>
              </div>
              <span>{singlePlant.height}</span>
            </div>
            <hr />
            <div className="plant-height">
              <div>
                <PiPottedPlantDuotone className="details-icon" />
                <span>Care level</span>
              </div>
              <span>
                {singlePlant.careDetails && singlePlant.careDetails.care_level}
              </span>
            </div>
            <hr />
          </div>
        </div>
        <PlantCare
          singlePlant={singlePlant}
          MdOutlineWaterDrop={MdOutlineWaterDrop}
          MdOutlineLightMode={MdOutlineLightMode}
        />
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
};
