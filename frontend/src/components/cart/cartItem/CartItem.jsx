import { useState } from "react";
import { cartStore } from "../../../stores/useCartStore";
import { Button } from "../../../components/buttons/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import "./CartItem.css";

export const CartItem = ({
  index,
  img,
  title,
  price,
  botanicalName,
  quantity,
}) => {
  // importing cart functions. 
  const { removeFromCart, addByIndexToCart } = cartStore();
  // states for handling snackbar alert messages
  const [addSnackbarOpen, setAddSnackbarOpen] = useState(false);
  const [removeSnackbarOpen, setRemoveSnackbarOpen] = useState(false);

  // function for closing snackbar, and setting the right snackbar to the right button.
  const handleSnackbarClose = (reason, snackbarType) => {
    if (reason === "clickaway") {
      return;
    }
    if (snackbarType === "add") {
      setAddSnackbarOpen(false);
    } else if (snackbarType === "remove") {
      setRemoveSnackbarOpen(false);
    }
  };

  // button functions for cart
  const handleRemoveFromCart = (index) => {
    removeFromCart(index);
    setRemoveSnackbarOpen(true);
  };

  const handleAddToCart = (index) => {
    addByIndexToCart(index);
    setAddSnackbarOpen(true);
  };

  return (
    <div className="cart-item-wrapper" key={index}>
      <div className="cart-img-wrapper">
        <img className="cart-img" src={img} alt={title} />
      </div>
      <div className="cart-item-content">
        <div className="cart-item-text">
          <h2 className="cart-item-title">{title}</h2>
          <span className="botanical-name cart-item-botanical-name">
            {botanicalName}
          </span>
        </div>
        <div className="cart-item-pq">
          <span className="item-price">€{price}</span>
          <div className="item-quantity-container">
            <Button
              className="cart-btn"
              onClick={() => handleRemoveFromCart(index)}
              btnText={<CiCircleMinus size={24} />}
            />
            <span>{quantity}</span>
            <Button
              className="cart-btn"
              onClick={() => handleAddToCart(index)}
              btnText={<CiCirclePlus size={24} />}
            />
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={addSnackbarOpen}
                autoHideDuration={3000}
                onClose={(reason) => handleSnackbarClose(reason, "add")}
              >
                <MuiAlert
                  onClose={(reason) => handleSnackbarClose(reason, "add")}
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
              <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              open={removeSnackbarOpen}
              autoHideDuration={3000}
              onClose={(reason) => handleSnackbarClose(reason, "remove")}
            >
              <MuiAlert
                onClose={(reason) => handleSnackbarClose(reason, "remove")}
                severity="info"
                sx={{
                  width: "100%",
                  backgroundColor: "#3f543f",
                  color: "#f3f3ea",
                  "& .MuiSvgIcon-root": {
                    fill: "#f3f3ea",
                  },
                }}
              >
                Plant removed from cart!
              </MuiAlert>
            </Snackbar>
          </div>
        </div>
      </div>
    </div>
  );
};
