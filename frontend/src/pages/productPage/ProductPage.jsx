import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../../components/buttons/Button";
import { plantStore } from "../../stores/plantStore";
import { cartStore } from "../../stores/cartStore";

import "./ProductPage.css";

export const ProductPage = () => {
  const { id } = useParams();
  console.log("plant product id:", id);

  const { singlePlant, setApiEndpoint, fetchSinglePlant } = plantStore();
  const { addToCart, cart } = cartStore();
  const [error, setError] = useState(null);

  useEffect(() => {
    setApiEndpoint(
      `https://plants-holm-witting-backend.onrender.com/api/plants/${id}`
    );
    fetchSinglePlant().catch((error) => {
      console.error("Error fetching plant details", error);
      setError(error);
    });
  }, [id, fetchSinglePlant]);

  console.log("PLANTS IN PRODUCT PAGE:", singlePlant);

  const handleAddToCart = () => {
    addToCart(singlePlant);
  };

  console.log("CART:", cart);

  return (
    <section className="product-page">
      <div className="product-highlights-wrapper">
        <h4>{singlePlant.botanical_name}</h4>
        <h3>{singlePlant.plant_title}</h3>
        <p>{singlePlant.description}</p>
        <p>€{singlePlant.price}</p>
        <Button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          btnText="Add to Cart"
          ariaLabel="cart button"
        />
      </div>
      <img
        className="product-image"
        src={singlePlant.images && singlePlant.images.full_size_url}
        alt=""
      />
      <div className="product-care-wrapper">
        <h4>Treatments & Facts</h4>
        <ul>
          <li>{singlePlant.careDetails && singlePlant.careDetails.watering}</li>
          <li>
            {singlePlant.careDetails && singlePlant.careDetails.care_level}
          </li>
          <li>{singlePlant.careDetails && singlePlant.careDetails.light}</li>
          <li>
            {singlePlant.careDetails &&
              singlePlant.careDetails.care_description}
          </li>
        </ul>
      </div>
    </section>
  );
};
