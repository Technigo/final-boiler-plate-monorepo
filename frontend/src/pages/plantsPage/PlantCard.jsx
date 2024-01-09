import { Link } from "react-router-dom";
import { PiHeartStraightFill } from "react-icons/pi";
import { Button } from "../../components/buttons/Button";

export const PlantCard = ({ plants }) => {
  return (
    <>
      {plants.map((plant) => {
        return (
          <Link to={`/plants/${plant._id}`} key={plant._id}>
              <div className="plant-card">
                <img
                  className="preview-plant-img"
                  src={plant.images.full_size_url}
                  alt=""
                />
                <div className="product-overlay">
                  <div className="btns-hover-container">
                    <Button
                      className="hover-btn-more"
                      btnText="more info"
                      ariaLabel="More info button"
                    />
                    <Button
                      className="hover-btn-add"
                      btnText="add to cart"
                      ariaLabel="More info button"
                    />
                  </div>
                  <PiHeartStraightFill className="like-icon" />
                  <div className="title-price-container">
                    <h3 className="card-name">{plant.plant_title}</h3>
                    <span className="card-price">€{plant.price}</span>
                  </div>
                </div>
              </div>
          </Link>
        );
      })}
    </>
  );
};
