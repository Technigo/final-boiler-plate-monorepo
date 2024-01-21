import { Link } from "react-router-dom";
import { Success } from "../lottie/lottieComp";
import "../../pages/checkOutPage/CheckOutPage.css"

export const OrderSuccess = () => {
  return (
    <div className="page-container-primary">
        <section className="success-message">
            <h2 className="section-title">Thank You for Your Order!</h2>
            <p className="h2-p">Wow! You made an order!</p>
            <div className="success-animation-wrapper">
                <Success />
            </div>
            <p className="p-body">Well, this is just a demo of a web based plant shop,
                but thank you for testing it out! You will be receiving an email with your order details, just for fun!</p>
            <p className="p-body">This page was brought to you by Julia Holm and Vera Witting. Check out <Link to="/about" className="about-link"><b>this page</b></Link> if you want to know more about this project or the developers!</p>
        </section>
    </div>
  );
};
