//import relavant library
import { NavigationMenu } from "../components/Common/NavigationMenu";
import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { Fade } from "react-awesome-reveal";

//import relevant components
import { HeadingComponent } from "../components/Reusables/HeadingComponent";
import { FooterComponent } from '../components/Common/FooterComponent';
import { SubHeadingComponent } from '../components/Reusables/SubHeadingComponent';
import { ParagraphComponent } from "../components/Reusables/ParagraphComponent";
import { PostNewsletter } from "../components/Newsletter/PostNewsletter";

//import relevant media 
import Video from "../assets/backgroundFilm.mp4"
import WhoAreWePhoto from "../assets/WhoAreWe.webp";



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
            {/* Set meta description dynamically */}
            <Helmet>
                <meta name="description" content="Learn about Tuanis Surf School and our passion for surfing. Discover our family-friendly surf lessons in Playa Samara, Costa Rica. Join us for an unforgettable surfing experience." />
            </Helmet>

            <div className="bg-backgroundPink">
                <NavigationMenu />
                <div className="lg:h-screen rounded-b-full" style={backgroundImageStyle}>
                    {/* Any content you want on top of the background image */}
                    <div className="rounded-full">
                        <HeadingComponent
                            className="w-1/2 mx-auto"
                            text="Who are we?"
                            level={1}
                            style={{}}
                        />
                    </div>

                </div>

                <div className="bg-backgroundPink">
                    <div className="mt-5 lg:mx-4 text-left justify-center lg:mt-16">
                        <ParagraphComponent text="Tuanis Surf School is a small family and friend owned business in Samara created by a group of awesome people that love the sport of surfing. We are all about the good life and we think that you are too. We are lucky to get guests from all over the world who come together to surf and enjoy our little piece of paradise. At Tuanis Surf School we have a great family vibe where you will instantly feel a sense of belonging. Surf with us to enjoy a social atmosphere and have a great time while making memories for life." />
                    </div>
                    <SubHeadingComponent className="lg:mb-0 lg:mt-16" text="We offer surf-lessons for all levels at:" />
                    <SubHeadingComponent className="lg:mb-0 lg:mt-1 mb-0" text="PLAYA SAMARA." />

                    {/* Video container */}

                    <div className="flex flex-col md:flex-row items-center justify-center h-3/6 md:h-5/6 lg:h-screen overflow-hidden relative">

                        {/* Video */}
                        <Fade>
                            <video autoPlay muted loop playsInline controls={false} className="w-full h-auto p-4 rounded-full lg:rounded-full lg:w-96 lg:h-96 lg:object-cover">
                                <source src={Video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </Fade>

                        {/* Text */}
                        <div className="lg:ml-4 max-w-md">
                            <ParagraphComponent className="text-left" text="Our focus is to offer a safe place where everyone feels included, accepted and comfortable while having the best time learning how to surf. Whatever your level is, we promise to elevate your surfing to the next level. We work hard to make sure that your safety is our top priority and that you learn the rules and etiquette of surfing while riding the waves. Join us for some legendary and dreamy surroundings." />
                        </div>

                    </div>

                    <div className="lg:grid lg:grid-cols-2">
                        <div className="lg:mx-32 mb-16">
                            <SubHeadingComponent text="Surfing is an activity for the whole family!" />

                            <ParagraphComponent className="text-left" text="All ages are welcomed! We have a lot of experience working with children of all ages: from as young as 3 years of age to our oldest surfer so far that was 78 years old. Our surf school welcomes everyone, from first timers to seasoned surfers, no matter what age you are. Surfing is also a great family activity, our expert instructors are great with kids and adults. Discover the passion of surfing together and create unforgettable memories in Costa Rica’s surfing paradise. Come and enjoy Playa Samara, our very family-friendly surf spot." />
                        </div>

                        <div className="lg:mx-16 mb-16">
                            <PostNewsletter />
                        </div>

                    </div>
                    <FooterComponent />
                </div>

            </div>
        </>
    )
}