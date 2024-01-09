import { NavigationMenu } from "../components/Common/NavigationMenu";
import { Fade } from "react-awesome-reveal";
import ContactUsBackground from "../assets/ContactUs.webp";
import { HeadingComponent } from "../components/Reusables/HeadingComponent";
import { FooterComponent } from '../components/Common/FooterComponent';
import { SubHeadingComponent } from '../components/Reusables/SubHeadingComponent';
import { ParagraphComponent } from "../components/Reusables/ParagraphComponent";
import { useEffect } from "react";
import { PostNewsletter } from "../components/Newsletter/PostNewsletter";
import { PhotoComponent } from "../components/Reusables/PhotoComponent";

import phoneIcon from "../assets/icons/phoneIcon.webp";
import emailIcon from "../assets/icons/emailIcon.webp";
import instagramLogo from "../assets/icons/instagramLogo.webp";
import tripAdvisorLogo from "../assets/icons/tripAdvisorLogo.webp";
import facebookLogo from "../assets/icons/facebookLogo.webp";

export const ContactUs = () => {

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page when the About component mounts
    }, []);

    const backgroundImageStyle = {
        backgroundImage: `url(${ContactUsBackground})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // Default backgroundSize for larger screens
        backgroundSize: 'cover',
    };

    return (
        <div className="bg-backgroundPink">
            <NavigationMenu />

            <div className="h-3/6 md:h-5/6 lg:h-screen rounded-b-full" style={backgroundImageStyle}>
                {/* Any content you want on top of the background image */}
                <HeadingComponent text="Contact Us" level={1} style={{}} />
            </div>

            <div className="rounded-md bg-custumPink lg:grid lg:grid-cols-2">

                {/* Left column with contact info */}
                <Fade>
                    <div className="lg:pr-8 lg:text-center border-y-4 border-customPink lg:border-x-4 border-customPink lg:border-y-0 h-auto m-4 lg:m-8 pb-4 rounded-md">
                        <SubHeadingComponent className="lg:pt-12" text="Do you have questions?" />
                        <SubHeadingComponent className="lg:pt-1 pb-4" text="Get in contact with us!" />

                        <div className="p-4 lg:py-2 text-lg font-josefin-sans max-w-4xl mx-auto">

                            <div className="flex flex-col items-center justify-center">
                                <div className="flex flex-row items-center">
                                    <PhotoComponent className="h-6 pr-2" src={phoneIcon} />
                                    <a href="tel:+50661407609">+50661407609</a>
                                </div>

                                <div className="pt-2 flex flex-row items-center">
                                    <PhotoComponent className="h-6 pr-2" src={emailIcon} />
                                    <a href="mailto:tuanissurfschool@gmail.com"> tuanissurfschool@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center">
                                <div className="pt-2 flex flex-row items-center">
                                    <PhotoComponent className="h-6 pr-2" src={tripAdvisorLogo} />
                                    <a href="https://www.tripadvisor.com/Attraction_Review-g309247-d19787493-Reviews-Tuanis_Surf_School_CR-Playa_Samara_Province_of_Guanacaste.html">Check us out on TRIP ADVISOR: Tuanis Surf School CR </a>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center">
                                <div className="pt-2 flex flex-row items-center">
                                    <PhotoComponent className="h-6 pr-2" src={facebookLogo} />
                                    <a href="https://www.facebook.com/tuanissurfschool/?paipv=0&eav=AfZcAqHp8xoNj6BXPrqGBrlM8DZiMLhXSdGfqcH8it8et64jyuXr0dA06xiFsvnXss0&_rdr">FACEBOOK &</a>
                                </div>
                                <div className="pt-2 flex flex-row items-center">
                                    <PhotoComponent className="h-6 pr-2" src={instagramLogo} />
                                    <a href="https://www.instagram.com/tuanissurfschool/">INSTAGRAM: Tuanis Surf School </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </Fade>

                {/* Right column with newsletter */}
                <div className="">
                    <PostNewsletter />
                </div>

            </div>
            <FooterComponent />
        </div >
    );
};