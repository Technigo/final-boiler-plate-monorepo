import { Fade } from "react-awesome-reveal";
import { BtnComponent } from '../Reusables/BtnComonent';
import { ParagraphComponent } from "../Reusables/ParagraphComponent";

//import relevant media
import tripAdvisorLogo from "../../assets/icons/tripAdvisorLogo.webp";
import facebookLogo from "../../assets/icons/facebookLogo.webp";
import instagramLogo from "../../assets/icons/instagramLogo.webp";

export const FooterComponent = ({ className }) => {

    return (
        <Fade>
            <div className="bg-customPink flex flex-col md:flex-row items-center justify-between h-auto">
                <div className="space-x-10 items-center flex md:flex-row md:space-x-20 md:container justify-center items-center p-3 pb-10">

                    <BtnComponent img={tripAdvisorLogo} alt="TripAdvisor Logo" href="https://www.tripadvisor.com/Attraction_Review-g309247-d19787493-Reviews-Tuanis_Surf_School_CR-Playa_Samara_Province_of_Guanacaste.html" target="_blank" />

                    <BtnComponent img={facebookLogo} alt="Facebook Logo" href='https://www.facebook.com/tuanissurfschool/?paipv=0&eav=AfYCyzqUfTs5bNCt_2AT_UJeCmq5RZVOoavmrGxBOW-J4d6Pj1vJIvr7aqiL7f7gNPw&_rdr' />

                    <BtnComponent img={instagramLogo} alt="Instagram Logo" href='https://www.instagram.com/tuanissurfschool/' />
                </div>

                <div className="items-center flex flex-col lg:flex-row md:container justify-center items-center">
                    <ParagraphComponent className="pb-0 lg:" text="Email: tuanissurfschool@gmail.com" />
                    <ParagraphComponent className="pt-0 pb-10 lg:" text="Phone: +506 6140-7609" />
                </div>
            </div>
        </Fade>
    );
};


