import { useParams } from "react-router-dom";
import { Button } from "../components/Button";

export const ProductPage = () => {

    const { id } = useParams();
    console.log("plant product id:", id);

    const [plantDetails, setPlantDetails] = useState([]);
    const [error, setError] = useState(null);
  
    console.log("PLANTS:", plantList);
  
    const plantApi = "http://localhost:3000/plants/${id}";
  
    const fetchPlantDetails = async () => {
      try {
        const response = await fetch(plantApi);
        if (!response.ok) {
          throw new Error("Failed to fetch plant details");
        }
  
        const plants = await response.json();
        setPlantDetails(plant);
      } catch (error) {
        console.error("Error fetching plant details", error);
        setError(error);
      }
    };
  
    useEffect(() => {
      fetchPlantDetails();
    }, []);

  return (
    <div> A PRODUCT
        <h4>{plantDetails.botanical_name}</h4>
        <h3>{plantDetails.plant_title}</h3>
        <p>{plantDetails.description}</p>
        <p>{plantDetails.price}</p>
        <Button
              className="add-to-cart-btn"
              btnText="Add to Cart"
              ariaLabel="cart button"
        />
        <img src={plantDetails.images.full_size_url} alt="" />
        <h4>Treatments & Facts</h4>
        <ul>
            <li>{plantDetails.careDetails.watering}</li>
            <li>{plantDetails.careDetails.care_level}</li>
            <li>{plantDetails.careDetails.light}</li>
            <li>{plantDetails.careDetails.care_description}</li>
        </ul>
 
    
    </div>
  );
};