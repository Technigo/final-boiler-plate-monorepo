import { NavigationMenu } from "../components/Common/NavigationMenu"
import { FooterComponent } from "../components/Common/FooterComponent"
import { PostBookingComponent } from "../components/Bookings/PostBookingComponent"
import { HeadingComponent } from "../components/Reusables/HeadingComponent"
import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';

//import media 
import WhoAreWePhoto from "../assets/SL2.webp";

export const BookNow = () => {

    useEffect(() => {
        console.log("Scrolling to the top");
        window.scrollTo(0, 0);
    }, []);

    const backgroundImageStyle = {
        backgroundImage: `url(${WhoAreWePhoto})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // Default backgroundSize for larger screens
        backgroundSize: 'cover'

    };
    return (

        <div className="bg-backgroundPink">

            {/* Set meta description dynamically */}
            <Helmet>
                <meta name="description" content="Book your surf lesson with Tuanis Surf School now. Join us for an exciting and fun surfing experience. Learn to surf with our experienced instructors." />
            </Helmet>

            <NavigationMenu />

            <div className="lg:h-screen" style={backgroundImageStyle}>
                <HeadingComponent text="Book Now"
                    level={1} style={{}} />
            </div>
            <div className="my-10 mx-6">
                <PostBookingComponent />
            </div>

            <FooterComponent />
        </div>
    )
}