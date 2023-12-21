import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../../components/buttons/Button";

import "./ProductPage.css"

export const ProductPage = () => {

    const { id } = useParams();
    console.log("plant product id:", id);

    const [plantDetails, setPlantDetails] = useState({});
    const [error, setError] = useState(null);
  
    console.log("PLANT:", plantDetails);
  
    const plantApi = `http://localhost:3000/plants/${id}`;
  
    const fetchPlantDetails = async () => {
      try {
        const response = await fetch(plantApi);
        if (!response.ok) {
          throw new Error("Failed to fetch plant details");
        }
        const plants = await response.json();
        setPlantDetails(plants);
      } catch (error) {
        console.error("Error fetching plant details", error);
        setError(error);
      }
    };
  
    useEffect(() => {
      fetchPlantDetails();
    }, [id]);

  return (
    <section className="product-page">
      <div className="product-highlights-wrapper">
        <h4>{plantDetails.botanical_name}</h4>
        <h3>{plantDetails.plant_title}</h3>
        <p>{plantDetails.description}</p>
        <p>{plantDetails.price}</p>
        <Button
              className="add-to-cart-btn"
              btnText="Add to Cart"
              ariaLabel="cart button"
        />
      </div>
        <img className="product-image" src={plantDetails.images && plantDetails.images.full_size_url} alt="" />
        <div className="product-care-wrapper">
        <h4>Treatments & Facts</h4>
        <ul>
            <li>{plantDetails.careDetails && plantDetails.careDetails.watering}</li>
            <li>{plantDetails.careDetails && plantDetails.careDetails.care_level}</li>
            <li>{plantDetails.careDetails && plantDetails.careDetails.light}</li>
            <li>{plantDetails.careDetails && plantDetails.careDetails.care_description}</li>
        </ul>
        </div>
 
    
    </section>
  );
};