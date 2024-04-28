import { Fade } from "react-awesome-reveal";
import { BtnComponent } from '../Reusables/BtnComonent';
import { ParagraphComponent } from "../Reusables/ParagraphComponent";

//import relevant media
import tripAdvisorLogo from "../../assets/icons/tripAdvisorLogo.webp";
import facebookLogo from "../../assets/icons/facebookLogo.webp";
import instagramLogo from "../../assets/icons/instagramLogo.webp";
import './water.css';

export const FooterComponent = () => {

    return (
        <Fade>
            <div className="mt-16">
                <div className="water">
                    <div className="bg-customPink flex flex-col md:flex-row items-center justify-between h-auto">

                        <div className="space-x-14 items-center flex md:flex-row md:space-x-20 md:container justify-center items-center mx-6 pb-0 pt-4 md:pb-7">

                            <BtnComponent img={tripAdvisorLogo} alt="TripAdvisor Logo" href="https://www.tripadvisor.com/Attraction_Review-g309247-d19787493-Reviews-Tuanis_Surf_School_CR-Playa_Samara_Province_of_Guanacaste.html" target="_blank" />

                            <BtnComponent img={facebookLogo} alt="Facebook Logo" href='https://www.facebook.com/tuanissurfschool/?paipv=0&eav=AfYCyzqUfTs5bNCt_2AT_UJeCmq5RZVOoavmrGxBOW-J4d6Pj1vJIvr7aqiL7f7gNPw&_rdr' />

                            <BtnComponent img={instagramLogo} alt="Instagram Logo" href='https://www.instagram.com/tuanissurfschool/' />
                        </div>

                        <div className="items-center flex flex-col lg:flex-row md:container justify-center items-center">

                            <ParagraphComponent className="text-pink-500 pt-7 lg:pt-0 lg:p-7 lg:mb-7" text="Phone: +506 6140-7609" />
                            <ParagraphComponent className="text-pink-500 pb-10 lg:p-7 lg:mb-7" text="Email: tuanissurfschool@gmail.com" />

                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    );
};


