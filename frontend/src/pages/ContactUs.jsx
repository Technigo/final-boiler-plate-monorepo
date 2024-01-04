import { NavigationMenu } from "../components/NavigationMenu";
import { Fade } from "react-awesome-reveal";
import ContactUsBackground from "../assets/ContactUs.jpg";
import { HeadingComponent } from "../components/HeadingComponent";
import { FooterComponent } from '../components/FooterComponent';
import { SubHeadingComponent } from '../components/SubHeadingComponent';
import { ParagraphComponent } from "../components/ParagraphComponent";
import { useEffect } from "react";
import { PostNewsletter } from "../components/PostNewsletter";

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
                    <div className="lg:pr-8 lg:text-center bg-customPink h-auto m-4 lg:m-8 rounded-md">
                        <SubHeadingComponent className="lg:pt-12" text="Do you have questions? Get in contact with us!" />
                        <div className="p-4 lg:py-2 text-lg font-josefin-sans max-w-4xl mx-auto">
                            <a className="block" href="tel:+50661407609">Call us:+50661407609</a>
                            <a className="block pt-4" href="mailto:tuanissurfschool@gmail.com">Email us: tuanissurfschool@gmail.com</a>

                            <a className="block pt-4" href="https://www.tripadvisor.com/Attraction_Review-g309247-d19787493-Reviews-Tuanis_Surf_School_CR-Playa_Samara_Province_of_Guanacaste.html">Check us out on TRIP ADVISOR: Tuanis Surf School CR </a>

                            <ParagraphComponent className="block pl-0 pt-4" text="See our social media:" />
                            <a href="https://www.facebook.com/tuanissurfschool/?paipv=0&eav=AfZcAqHp8xoNj6BXPrqGBrlM8DZiMLhXSdGfqcH8it8et64jyuXr0dA06xiFsvnXss0&_rdr">FACEBOOK &</a>
                            <a href="https://www.instagram.com/tuanissurfschool/">INSTAGRAM: Tuanis Surf School </a>
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