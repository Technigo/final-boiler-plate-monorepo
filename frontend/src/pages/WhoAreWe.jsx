//import relavant library
import { NavigationMenu } from "../components/NavigationMenu";
import { useEffect } from "react";

//import relevant components
import { HeadingComponent } from "../components/HeadingComponent";
import { FooterComponent } from '../components/FooterComponent';
import { SubHeadingComponent } from '../components/SubHeadingComponent';
import { ParagraphComponent } from "../components/ParagraphComponent";
import Video from "../assets/backgroundFilm.mp4"
//import media 
import WhoAreWePhoto from "../assets/WhoAreWe.jpg";
export const WhoAreWe = () => {

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
        <>
            <div className="bg-backgroundPink">
                <NavigationMenu />
                <div className="h-96 lg:h-screen rounded-full" style={backgroundImageStyle}>
                    {/* Any content you want on top of the background image */}
                    <div className="rounded-full">
                        <HeadingComponent
                            className="rounded-b-full pb-10 bg-gradient-to-b from-pink-400 from-0% to-transparent to-100% w-1/2 mx-auto"
                            text="Who are we?"
                            level={1}
                            style={{}}
                        />
                    </div>

                </div>

                <div className="bg-backgroundPink">
                    <ParagraphComponent text="Tuanis Surf School is a small family and friend owned business in Samara created by a group of awesome people that love the sport of surfing. We are all about the good life and we think that you are too. We are lucky to get guests from all over the world who come together to surf and enjoy our little piece of paradise. At Tuanis Surf School we have a great family vibe where you will instantly feel a sense of belonging. Surf with us to enjoy a social atmosphere and have a great time while making memories for life." />

                    <SubHeadingComponent className="mb-0" text="We offer surf-lessons for all levels at: PLAYA SAMARA." />

                    {/* Video container */}
                    <div className="flex items-center justify-center h-3/6 md:h-5/6 lg:h-screen rounded-full overflow-hidden relative">
                        {/* Video */}
                        <video autoPlay muted loop className="rounded-full w-1/4 h-2/4 h-full object-cover">
                            <source src={Video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {/* Text */}
                        <div className="ml-4 max-w-md">
                            <ParagraphComponent className="" text="Our focus is to offer a safe place where everyone feels included, accepted and comfortable while having the best time learning how to surf. Whatever your level is, we promise to elevate your surfing to the next level. We work hard to make sure that your safety is our top priority and that you learn the rules and etiquette of surfing while riding the waves. Join us for some legendary and dreamy surroundings." />
                        </div>
                    </div>


                    <FooterComponent />
                </div>
            </div>
        </>
    )
}