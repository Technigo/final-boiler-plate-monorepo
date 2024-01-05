// Import the back arrow logo image.
import backArrow from "../../assets/back-arrow.svg";
import "./backarrow.css";

// Import the useNavigate hook from react-router-dom.
import { useNavigate } from "react-router-dom";

// Define the 'BackArrow' functional component.
function BackArrow() {
  const navigate = useNavigate();

  // You can then use the `navigate` function to navigate to different routes.
  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <div>
        {/* Create a link to the previous page */}
        <a href="#" onClick={handleClick}>
          {/* Display the back arrow logo image with a CSS class 'logo'. */}
          <img className="back" src={backArrow} alt="Back arrow logo" />
          <img className="back" src={backArrow} alt="Back arrow logo" />
          <img className="back" src={backArrow} alt="Back arrow logo" />
        </a>
      </div>
    </div>
  );
}

export default BackArrow;
