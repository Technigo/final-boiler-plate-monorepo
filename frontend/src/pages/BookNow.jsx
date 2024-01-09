import { NavigationMenu } from "../components/Common/NavigationMenu"
import { FooterComponent } from "../components/Common/FooterComponent"
import { PostBookingComponent } from "../components/Bookings/PostBookingComponent"
import { HeadingComponent } from "../components/Reusables/HeadingComponent"
import { useEffect } from "react";

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
            <NavigationMenu />
            <div className="lg:h-screen rounded-b-full" style={backgroundImageStyle}>
                <HeadingComponent text="Book Now"
                    level={1} style={{}} />
            </div>
            <PostBookingComponent />
            <FooterComponent />
        </div>
    )
}