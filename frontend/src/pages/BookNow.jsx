import { NavigationMenu } from "../components/NavigationMenu"
import { FooterComponent } from "../components/FooterComponent"
import { PostBookingComponent } from "../components/PostBookingComponent"
import { HeadingComponent } from "../components/HeadingComponent"

export const BookNow = () => {
    return (
        <>
            <div className="bg-backgroundPink">
                <NavigationMenu />
                <HeadingComponent text="Book Now" level={1} style={{}} />
                <PostBookingComponent />
                <FooterComponent />
            </div>
        </>
    )
}