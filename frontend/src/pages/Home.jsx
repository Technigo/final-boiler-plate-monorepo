//Import relevant library
import { NavigationMenu } from "../components/Common/NavigationMenu";
import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { Fade } from "react-awesome-reveal";

//Import relevant components
import { HeadingComponent } from "../components/Reusables/HeadingComponent";
import { FooterComponent } from '../components/Common/FooterComponent';
import { SubHeadingComponent } from '../components/Reusables/SubHeadingComponent';

//import relevant media
import homePhoto from "../assets/homePhoto.webp";
import HomeSurfing from "../assets/HomeSurfing.mp4"

export const Home = () => {
    const backgroundImageStyle = {
        backgroundImage: `url(${homePhoto})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // Default backgroundSize for larger screens
        backgroundSize: 'cover',
    };

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page when the About component mounts
    }, []);

    return (
        <div className="bg-backgroundPink">
            {/* Set meta description dynamically */}
            <Helmet>
                <meta name="description" content="Welcome to Tuanis Surf School! Learn to surf and have fun with our experienced instructors." />
            </Helmet>

            <NavigationMenu />

            <div className="h-3/6 md:h-5/6 lg:h-screen rounded-b-full" style={backgroundImageStyle}>
                {/* Any content you want on top of the background image */}
                <HeadingComponent text="Tuanis Surf School" level={1} style={{}} />
            </div>

            <Fade>
                <div className="relative h-screen lg:h-full flex items-center md:justify-center rounded-full overflow-hidden">
                    {/* Video */}

                    <video autoPlay muted loop playsInline controls={false} className="rounded-full object-cover w-full h-full lg:w-4/6 lg:h-4/6 md:p-10">
                        <source src={HomeSurfing} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Text overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <SubHeadingComponent className="md:text-6xl font-moo-lah-lah text-customPink drop-shadow-[0_1.9px_1.9px_rgba(0,1,7,5.9)]" text="We believe that the most important part of surfing is to have fun. If you’re not having fun," />
                        <SubHeadingComponent className="pb-12 md:text-6xl font-moo-lah-lah text-customPink drop-shadow-[0_1.9px_1.9px_rgba(0,1,7,5.9)]" text="you’re doing it wrong!" />
                    </div>

                </div>
            </Fade>

            <FooterComponent />
        </div>
    );
};