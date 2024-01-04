import { NavigationMenu } from "../components/NavigationMenu"
import { FooterComponent } from "../components/FooterComponent"
import { PostBookingComponent } from "../components/PostBookingComponent"
import { HeadingComponent } from "../components/HeadingComponent"
import { useEffect } from "react";

//import media 
import WhoAreWePhoto from "../assets/SL2.jpg";

export const BookNow = () => {

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page when the About component mounts
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