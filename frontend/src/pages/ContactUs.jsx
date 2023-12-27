import { NavigationMenu } from "../components/NavigationMenu";
import ContactUsBackground from "../assets/ContactUs.jpg";
import { HeadingComponent } from "../components/HeadingComponent";
import { FooterComponent } from '../components/FooterComponent';
import { SubHeadingComponent } from '../components/SubHeadingComponent';
import { ParagraphComponent } from "../components/ParagraphComponent";
import { useEffect } from "react";
import { FadeWrapper } from "../components/Fade";

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
        <FadeWrapper>
            <div className="bg-backgroundPink">
                <NavigationMenu />
                <div className="h-3/6 md:h-5/6 lg:h-screen rounded-full" style={backgroundImageStyle}>
                    {/* Any content you want on top of the background image */}
                    <HeadingComponent text="Contact Us" level={1} style={{}} />
                </div>
                <div className="bg-backgroundPink">

                    <SubHeadingComponent className="pt-12" text="Do you have questions?" />
                    <SubHeadingComponent className="" text="Get in contact with us!" />

                    <SubHeadingComponent className="pt-12" text="Call or message: +506 6140-7609" />
                    <SubHeadingComponent className="" text="Email: tuanissurfschool@gmail.com" />

                    <SubHeadingComponent className="pt-12" text="Check us out on TRIP ADVISOR: Tuanis Surf" />
                    <SubHeadingComponent className="pb-12" text="School CR See our social media FACEBOOK & INSTAGRAM: Tuanis Surf School" />
                    <FooterComponent />
                </div>
            </div>
        </FadeWrapper>
    )
}