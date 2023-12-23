import { NavigationMenu } from "../components/NavigationMenu"
import { FooterComponent } from "../components/FooterComponent"
import { PostBookingComponent } from "../components/PostBookingComponent"
import { HeadingComponent } from "../components/HeadingComponent"
import { useEffect } from "react";


export const BookNow = () => {

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page when the About component mounts
    }, []);

    return (

        <div className="bg-backgroundPink">
            <NavigationMenu />
            <HeadingComponent text="Book Now" level={1} style={{}} />
            <PostBookingComponent />
            <FooterComponent />
        </div>

    )
}