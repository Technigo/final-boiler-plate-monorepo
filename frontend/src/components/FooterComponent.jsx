import { Fade } from "react-awesome-reveal";
import { BtnComponent } from './BtnComonent';
import tripAdvisorLogo from "../assets/icons/tripAdvisorLogo.png";
import facebookLogo from "../assets/icons/facebookLogo.png";
import instagramLogo from "../assets/icons/instagramLogo.png";
//import { FadeWrapper } from './Fade';

export const FooterComponent = ({ className }) => {
    // You can use template literals to concatenate Tailwind CSS classes
    const defaultClasses = 'text-l font-josefin-sans md:p-5'; // You can customize this based on your design

    return (
        <Fade>
            <div className="bg-customPink flex flex-col md:flex-row items-center justify-between h-auto">
                <div className="space-x-10 items-center flex md:flex-row md:space-x-20 md:container justify-center items-center p-3">

                    <BtnComponent img={tripAdvisorLogo} alt="TripAdvisor Logo " href="https://www.tripadvisor.com/Attraction_Review-g309247-d19787493-Reviews-Tuanis_Surf_School_CR-Playa_Samara_Province_of_Guanacaste.html" target="_blank" />

                    <BtnComponent img={facebookLogo} alt="Facebook Logo" href='https://www.facebook.com/tuanissurfschool/?paipv=0&eav=AfYCyzqUfTs5bNCt_2AT_UJeCmq5RZVOoavmrGxBOW-J4d6Pj1vJIvr7aqiL7f7gNPw&_rdr' />

                    <BtnComponent img={instagramLogo} alt="Instagram Logo" href='https://www.instagram.com/tuanissurfschool/' />
                </div>

                <div className="items-center flex flex-col lg:flex-row md:container justify-center items-center">
                    <p className={`${defaultClasses} ${className}`}>Email: tuanissurfschool@gmail.com </p>
                    <p className={`${defaultClasses} ${className}`}>Phone: +506 6140-7609 </p>
                </div>
            </div>
        </Fade>
    );
};


