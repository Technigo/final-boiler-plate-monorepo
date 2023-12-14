import { NavigationMenu } from "../components/NavigationMenu";
import WhoAreWePhoto from "../assets/WhoAreWePhoto.jpg";
import { HeadingComponent } from "../components/HeadingComponent";
import { FooterComponent } from '../components/FooterComponent';
import { SubHeadingComponent } from '../components/SubHeadingComponent';
import { ParagraphComponent } from "../components/ParagraphComponent";

export const ContactUs = () => {

    const backgroundImageStyle = {
        backgroundImage: `url(${WhoAreWePhoto})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // Default backgroundSize for larger screens
        backgroundSize: 'cover',

    };

    return (
        <>
            <div className="bg-backgroundPink">
                <NavigationMenu />
                <div className="h-96 lg:h-screen" style={backgroundImageStyle}>
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
        </>
    )
}