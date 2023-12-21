import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../../components/buttons/Button";
import { plantStore } from "../../stores/plantStore";
import { cartStore } from "../../stores/cartStore";

import "./ProductPage.css";

export const ProductPage = () => {
  const { id } = useParams();
  console.log("plant product id:", id);

  const { plants, fetchPlants, setApiEndpoint } = plantStore();
  const { addToCart, cart } = cartStore();
  const [error, setError] = useState(null);

  useEffect(() => {
    setApiEndpoint(`http://localhost:3000/plants/${id}`);
    fetchPlants().catch((error) => {
      console.error("Error fetching plant details", error);
      setError(error);
    });
  }, [id, fetchPlants, setApiEndpoint]);

  console.log("PLANTS IN PRODUCT PAGE:", plants);

  const handleAddToCart = () => {
    addToCart(plants)
  }

  console.log("CART:", cart)
  
  return (
    <section className="product-page">
      <div className="product-highlights-wrapper">
        <h4>{plants.botanical_name}</h4>
        <h3>{plants.plant_title}</h3>
        <p>{plants.description}</p>
        <p>{plants.price}</p>
        <Button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          btnText="Add to Cart"
          ariaLabel="cart button"
        />
      </div>
      <img
        className="product-image"
        src={plants.images && plants.images.full_size_url}
        alt=""
      />
      <div className="product-care-wrapper">
        <h4>Treatments & Facts</h4>
        <ul>
          <li>{plants.careDetails && plants.careDetails.watering}</li>
          <li>{plants.careDetails && plants.careDetails.care_level}</li>
          <li>{plants.careDetails && plants.careDetails.light}</li>
          <li>{plants.careDetails && plants.careDetails.care_description}</li>
        </ul>
      </div>
    </section>
  );
};
