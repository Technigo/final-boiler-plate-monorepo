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

//import relevant media 
import WhoAreWePhoto from "../assets/WhoAreWePhoto.jpeg";
import homePhoto from "../assets/homePhoto.webp";

import family from "../assets/icons/family.png";
import female from "../assets/icons/female.png";
import weakling from "../assets/icons/weakling.png";

import collage1 from "../assets/collage1.png";
import collage2 from "../assets/collage2.png";
import collage3 from "../assets/collage3.png";
import collage4 from "../assets/collage4.png";


import { PhotoComponent } from "../components/Reusables/PhotoComponent";
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
                <div className="lg:h-screen" style={backgroundImageStyle}>
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

                <div className="bg-backgroundPink mx-6 my-10 md:mx-10">

                    <SubHeadingComponent className="px-6 md:text-5xl text-pink-500" text="Get to know us!" />

                    <div className="lg:mx-4 text-left justify-center lg:mt-16">
                        <ParagraphComponent text="Tuanis Surf School is a small family owned business at Samara Beach founded
by Sofie, who is passionated about sharing her love for surfing and the ocean.
Our team of employees are all about the good life and we think that you are
too. We are lucky enough to get guests from all over the world who come
together to surf and enjoy our little piece of paradise. At Tuanis Surf School we
have a great family vibe where you will instantly feel a sense of belonging." />
                    </div>

                    <div className="mx-36 my-16 grid gap-1 md:grid-cols-1 lg:grid-cols-3">
                        <div className="flex flex-col items-center justify-center">
                            <div className="border-2 border-customPink w-44 flex flex-col items-center justify-center rounded-t-lg">
                                <ParagraphComponent text="For all levels" />
                            </div>
                            <div className="bg-customPink w-44 flex items-center justify-center rounded-b-lg">
                                <PhotoComponent className="h-20 w-20" src={weakling} alt="picture of surfing" />
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <div className="border-2 border-customPink w-44 flex flex-col items-center justify-center rounded-t-lg">
                                <ParagraphComponent text="Female instructors" />
                            </div>
                            <div className="bg-customPink w-44 flex items-center justify-center rounded-b-lg">
                                <PhotoComponent className="h-20 w-20" src={female} alt="picture of surfing" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="border-2 border-customPink w-44 flex flex-col items-center justify-center rounded-t-lg">
                                <ParagraphComponent text="For the whole family" />
                            </div>
                            <div className="bg-customPink w-44 flex items-center justify-center rounded-b-lg">
                                <PhotoComponent className="h-20 w-20" src={family} alt="picture of surfing" />
                            </div></div>
                    </div>


                    <SubHeadingComponent className="px-6 md:text-5xl text-pink-500" text="Surf with us to enjoy a social atmosphere and have a great time while making memories for life." />

                    <div className="my-36 mx-6 grid gap-2 md:grid-cols-1 lg:grid-cols-2">
                        <div className="">
                            <PhotoComponent className="" src={collage1} alt="picture of surfing" />
                        </div>
                        <div className="grid gap-2 md:grid-cols-1 lg:grid-cols-2 justify-center items-center">
                            <div className="">
                                <PhotoComponent className="" src={collage2} alt="picture of surfing" />
                            </div>
                            <div className="">
                                <PhotoComponent className="" src={collage3} alt="picture of surfing" />
                                <PhotoComponent className="py-2" src={collage4} alt="picture of surfing" />
                            </div>
                        </div>
                    </div>


                    <div className="">
                    </div>
                    <div className="my-10 flex flex-col md:flex-row items-center justify-center h-3/6 md:h-5/6 lg:h-screen overflow-hidden relative">

                        {/* Text */}
                        <div className="my-10 lg:ml-4 max-w-lg">

                            <SubHeadingComponent className="lg:mb-0 lg:mt-16" text="We offer surf-lessons for all levels at:" />
                            <SubHeadingComponent className="lg:mb-0 lg:mt-1 mb-0" text="PLAYA SAMARA" />

                            <ParagraphComponent className="text-left" text="Our focus is to offer a safe place where everyone feels included, accepted and
comfortable while having the best time learning how to surf. Whatever your
level is, we promise to elevate your surfing to the next one. We work hard to
make sure that your safety is our top priority and that you learn the rules and
etiquette of surfing while mastering how to ride the waves.
Join us for some legendary and dreamy surroundings at beautiful Samara
Beach, Costa Rica." />

                            <SubHeadingComponent className="lg:mb-0 lg:mt-16" text="Female instructors" />

                            <ParagraphComponent className="text-left" text="Our focus is to offer a safe place where everyone feels included, accepted and
comfortable while having the best time learning how to surf. Whatever your
level is, we promise to elevate your surfing to the next one. We work hard to
make sure that your safety is our top priority and that you learn the rules and
etiquette of surfing while mastering how to ride the waves.
Join us for some legendary and dreamy surroundings at beautiful Samara
Beach, Costa Rica." />
                        </div>

                    </div>

                    <div className="lg:grid lg:grid-cols-2">
                        <div className="lg:mx-32 mb-16">
                            <SubHeadingComponent text="Surfing is an activity for the whole family!" />

                            <ParagraphComponent className="my-10 text-left" text="All ages are welcomed! We have a lot of experience working with children of all ages: from as young as 3 years of age to our oldest surfer so far that was 78 years old. Our surf school welcomes everyone, from first timers to seasoned surfers, no matter what age you are. Surfing is also a great family activity, our expert instructors are great with kids and adults. Discover the passion of surfing together and create unforgettable memories in Costa Rica’s surfing paradise. Come and enjoy Playa Samara, our very family-friendly surf spot." />
                        </div>

                        <div className="lg:mx-16 mb-16">

                        </div>

                    </div>

                </div>
                <FooterComponent />
            </div >
        </>
    )
}