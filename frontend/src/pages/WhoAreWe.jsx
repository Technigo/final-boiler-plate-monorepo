//import relavant library
import { NavigationMenu } from "../components/NavigationMenu";
import { useEffect } from "react";

//import relevant components
import { HeadingComponent } from "../components/HeadingComponent";
import { FooterComponent } from '../components/FooterComponent';
import { SubHeadingComponent } from '../components/SubHeadingComponent';
import { ParagraphComponent } from "../components/ParagraphComponent";
import { PostNewsletter } from "../components/PostNewsletter";

//import media 
import Video from "../assets/backgroundFilm.mp4"
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
                <div className="lg:h-screen rounded-b-full" style={backgroundImageStyle}>
                    {/* Any content you want on top of the background image */}
                    <div className="rounded-full">
                        <HeadingComponent
                            className="rounded-b-full pb-0 bg-gradient-to-b from-pink-400 from-0% to-transparent to-100% w-1/2 mx-auto"
                            text="Who are we?"
                            level={1}
                            style={{}}
                        />
                    </div>

                </div>

                <div className="bg-backgroundPink">
                    <div className="mt-5 lg:mx-4 lg:text-center justify-center lg:mt-16">
                        <ParagraphComponent text="Tuanis Surf School is a small family and friend owned business in Samara created by a group of awesome people that love the sport of surfing. We are all about the good life and we think that you are too. We are lucky to get guests from all over the world who come together to surf and enjoy our little piece of paradise. At Tuanis Surf School we have a great family vibe where you will instantly feel a sense of belonging. Surf with us to enjoy a social atmosphere and have a great time while making memories for life." />
                    </div>
                    <SubHeadingComponent className="lg:mb-16 lg:mt-16" text="We offer surf-lessons for all levels at: PLAYA SAMARA." />

                    {/* Video container */}
                    <div className="flex flex-col md:flex-row items-center justify-center h-3/6 md:h-5/6 lg:h-screen overflow-hidden relative">
                        {/* Video */}
                        <video autoPlay muted loop className="w-84 h-auto p-4 rounded-full lg:rounded-full lg:w-2/4 lg:h-2/4 lg:h-full lg:object-cover">
                            <source src={Video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {/* Text */}
                        <div className="lg:ml-4 max-w-md">
                            <ParagraphComponent className="" text="Our focus is to offer a safe place where everyone feels included, accepted and comfortable while having the best time learning how to surf. Whatever your level is, we promise to elevate your surfing to the next level. We work hard to make sure that your safety is our top priority and that you learn the rules and etiquette of surfing while riding the waves. Join us for some legendary and dreamy surroundings." />
                        </div>

                    </div>
                    <div className="lg:grid lg:grid-cols-2">
                        <div className="lg:m-32">
                            <SubHeadingComponent text="Surfing is an activity for the whole family!" />

                            <ParagraphComponent className="lg:text-center" text="All ages are welcomed! We have a lot of experience working with children of all ages: from as young as 3 years of age to our oldest surfer so far that was 78 years old. Our surf school welcomes everyone, from first timers to seasoned surfers, no matter what age you are. Surfing is also a great family activity, our expert instructors are great with kids and adults. Discover the passion of surfing together and create unforgettable memories in Costa Rica’s surfing paradise. Come and enjoy Playa Samara, our very family-friendly surf spot." />
                        </div>
                        <div className="lg:m-16">
                            <PostNewsletter />
                        </div>
                    </div>
                    <FooterComponent />
                </div>
            </div>
        </>
    )
}