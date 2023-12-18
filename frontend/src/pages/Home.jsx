
import { NavigationMenu } from "../components/NavigationMenu";
import homePhoto from "../assets/homePhoto.jpg";
import { HeadingComponent } from "../components/HeadingComponent";
import { FooterComponent } from '../components/FooterComponent';
import { SubHeadingComponent } from '../components/SubHeadingComponent';


export const Home = () => {
    const backgroundImageStyle = {
        backgroundImage: `url(${homePhoto})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // Default backgroundSize for larger screens
        backgroundSize: 'cover',

    };

    return (
        <div className="bg-backgroundPink h-screen">

            <NavigationMenu />

            <div className="h-3/6 md:h-5/6 lg:h-full" style={backgroundImageStyle}>
                {/* Any content you want on top of the background image */}
                <HeadingComponent text="Tuanis Surf School" level={1} style={{}} />
            </div>

            <div className="bg-backgroundPink">

                <SubHeadingComponent className="pt-12" text="We believe that the most important part of surfing is to have fun. If you’re not having fun, " />
                <SubHeadingComponent className="pb-12" text="you’re doing it wrong!" />

            </div>
            <FooterComponent />
        </div>
    );
};
