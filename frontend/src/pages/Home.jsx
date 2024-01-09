//Import relevant library
import { NavigationMenu } from "../components/Common/NavigationMenu";
import { useEffect } from "react";

//Import relevant components
import { HeadingComponent } from "../components/Reusables/HeadingComponent";
import { FooterComponent } from '../components/Common/FooterComponent';
import { SubHeadingComponent } from '../components/Reusables/SubHeadingComponent';

//import relevant media
import homePhoto from "../assets/homePhoto.webp";


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

            <NavigationMenu />
            <div className="h-3/6 md:h-5/6 lg:h-screen rounded-b-full" style={backgroundImageStyle}>

                {/* Any content you want on top of the background image */}
                <HeadingComponent text="Tuanis Surf School" level={1} style={{}} />
            </div>

            <div className="bg-backgroundPink md:h-full md:my-24 md:mx-24 lg:h-auto lg:mx-0">
                <SubHeadingComponent className="md:text-6xl font-moo-lah-lah text-customPink drop-shadow-[0_1.9px_1.9px_rgba(0,1,7,5.9)]" text="We believe that the most important part of surfing is to have fun. If you’re not having fun," />
                <SubHeadingComponent className="pb-12 md:text-6xl font-moo-lah-lah text-amber-300 drop-shadow-[0_1.9px_1.9px_rgba(0,1,7,5.9)]" text="you’re doing it wrong!" />
            </div>

            <FooterComponent />
        </div>

    );
};
