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
import WhoAreWePhoto from "../assets/WhoAreWe/whoAreWePhoto.webp";

import family from "../assets/icons/family.png";
import female from "../assets/icons/female.png";
import weakling from "../assets/icons/weakling.png";

import collage1 from "../assets/WhoAreWe/collage1.webp";
import collage2 from "../assets/WhoAreWe/collage2.webp";
import collage3 from "../assets/WhoAreWe/collage3.webp";
import collage4 from "../assets/WhoAreWe/collage4.webp";

import PlayaSamara from "../assets/WhoAreWe/PlayaSamara.webp";
import AllLevels from "../assets/WhoAreWe/AllLevels.webp";
import FemaleInstructors from "../assets/WhoAreWe/FemaleInstructors.webp";
import photography from "../assets/WhoAreWe/photography.webp";

//import relevant media
import logo from '../assets/logo.webp';
import "../../src/font.css";
import '../../src/logo.css';


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
                <div className="h-screen" style={backgroundImageStyle}>
                    {/* Any content you want on top of the background image */}
                </div>


                <div className="">
                    <HeadingComponent
                        className=""
                        text="Who are we?"
                        level={1}
                        style={{}}
                    />
                </div>
                <div className="bg-backgroundPink mx-6 my-10 lg:mx-10">

                    <SubHeadingComponent className="mt-10 mx-6 md:text-5xl text-pink-500" text="Get to know us!" />

                    <div className="text-left justify-center mt-5 md:mt-10 md:mx-6">
                        <ParagraphComponent text="Tuanis Surf School is a small family owned business at Samara Beach founded
                        by Sofie, who is passionated about sharing her love for surfing and the ocean.
                        Our team of employees are all about the good life and we think that you are
                        too. We are lucky enough to get guests from all over the world who come
                        together to surf and enjoy our little piece of paradise. At Tuanis Surf School we
                        have a great family vibe where you will instantly feel a sense of belonging." />
                    </div>

                    {/* Icons */}
                    <div className="mx-36 my-10 grid gap-1 items-center justify-center md:grid-cols-1 lg:grid-cols-3">
                        <div className="flex flex-col items-center justify-center mt-10">
                            <div className="border-2 border-customPink w-44 flex flex-col items-center justify-center rounded-t-lg">
                                <ParagraphComponent text="For all levels" />
                            </div>
                            <div className="bg-customPink w-44 flex items-center justify-center rounded-b-lg">
                                <PhotoComponent className="h-20 w-20" src={weakling} alt="picture of surfing" />
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center mt-10">
                            <div className="border-2 border-customPink w-44 flex flex-col items-center justify-center rounded-t-lg">
                                <ParagraphComponent text="Female instructors" />
                            </div>
                            <div className="bg-customPink w-44 flex items-center justify-center rounded-b-lg">
                                <PhotoComponent className="h-20 w-20" src={female} alt="picture of surfing" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center mt-10">
                            <div className="border-2 border-customPink w-44 flex flex-col items-center justify-center rounded-t-lg">
                                <ParagraphComponent text="For the whole family" />
                            </div>
                            <div className="bg-customPink w-44 flex items-center justify-center rounded-b-lg">
                                <PhotoComponent className="h-20 w-20" src={family} alt="picture of surfing" />
                            </div></div>
                    </div>

                    {/* Collage */}
                    <SubHeadingComponent className="py-10 md:text-5xl text-pink-500" text="Surf with us to enjoy a social atmosphere and have a great time while making memories for life." />

                    <div className="mt-10 md:my-36 md:mx-6 grid gap-2 md:grid-cols-1 lg:grid-cols-2">
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


                    {/* Grid */}

                    <div className="grid gap-2 md:grid-cols-1 lg:grid-cols-2 justify-center items-center mt-10 md:my-36 md:mx-6">

                        <div className="">
                            <SubHeadingComponent className="text-pink-500" text="We offer surf-lessons for all levels at:" />
                            <SubHeadingComponent className="md:pb-5  text-pink-500" text="PLAYA SAMARA" />

                            <ParagraphComponent className="py-12 text-left lg:px-10" text="Our focus is to offer a safe place where everyone feels included, accepted and
                            comfortable while having the best time learning how to surf. Whatever your
                            level is, we promise to elevate your surfing to the next one. We work hard to
                            make sure that your safety is our top priority and that you learn the rules and
                            etiquette of surfing while mastering how to ride the waves.
                            Join us for some legendary and dreamy surroundings at beautiful Samara
                            Beach, Costa Rica." />
                        </div>

                        <div>
                            <PhotoComponent className="my-2 rounded-md" src={PlayaSamara} alt="picture of surfing" />
                        </div>


                        <div>
                            <div>
                                <PhotoComponent className="my-2 rounded-md" src={FemaleInstructors} alt="picture of surfing" />
                            </div>
                        </div>
                        <div>
                            <SubHeadingComponent className="md:pb-5  text-pink-500" text="Female instructors" />

                            <ParagraphComponent className="py-12 text-left lg:px-10" text="Our focus is to offer a safe place where everyone feels included, accepted and comfortable while having the best time learning how to surf. Whatever your
                            level is, we promise to elevate your surfing to the next one. We work hard to
                            make sure that your safety is our top priority and that you learn the rules and
                            etiquette of surfing while mastering how to ride the waves.
                            Join us for some legendary and dreamy surroundings at beautiful Samara
                            Beach, Costa Rica." />
                        </div>

                        <div className="">
                            <SubHeadingComponent className="md:pb-5 text-pink-500" text="Surfing is an activity for the whole family!" />

                            <ParagraphComponent className="py-12 lg:px-10 text-left" text="All ages are welcomed! We have a lot of experience working with children of all ages: from as young as 3 years of age to our oldest surfer so far that was 78 years old. Our surf school welcomes everyone, from first timers to seasoned surfers, no matter what age you are. Surfing is also a great family activity, our expert instructors are great with kids and adults. Discover the passion of surfing together and create unforgettable memories in Costa Rica’s surfing paradise. Come and enjoy Playa Samara, our very family-friendly surf spot." />
                        </div>
                        <div>
                            <PhotoComponent className="my-2 rounded-md" src={AllLevels} alt="picture of surfing" />
                        </div>

                        <div className="">
                            <PhotoComponent className="my-2 rounded-md" src={photography} alt="picture of surfing" />

                        </div>
                        <div>
                            <SubHeadingComponent className="md:pb-5 text-pink-500" text="Surf Photography" />

                            <ParagraphComponent className="py-12 lg:px-10 text-left" text="We offer high-quality, professional photos and/or videos of your lesson. It is a
great way to catch the moment and save it forever. You get to keep a special
memory from your trip and it is also a great way to analyse your style and
improve your technique for your next session.
Contact us for more information and pricing." />
                        </div>
                    </div>



                    <div>
                        <div className="py-10">
                            <SubHeadingComponent className="md:text-5xl text-pink-500" text="The meaning of" />
                            <SubHeadingComponent className="italic md:text-5xl text-pink-500" text="Tuanis" />
                        </div>
                        <p className="py-12 lg:px-10 text-center lg:py-2 text-lg font-josefin-sans max-w-4xl mx-auto">Costa Rican slang:
                            <ol>
                                <li>1. Adjective used to denote a general sense of
                                    wellbeing.</li>
                                <li>2. Noun that indicates coolness.</li>
                                <li>3. Synonym to the phrase pura vida.</li>
                                <li>4. Sometimes used as a salutation or affirmation</li>
                            </ol>
                        </p>


                        {/* Map */}
                        <div className="grid gap-2 md:grid-cols-1 lg:grid-cols-2 justify-center items-center mt-10 md:my-36 md:mx-6">
                            <div className="flex flex-col justify-center items-center mb-16">
                                <SubHeadingComponent className="md:pb-5 text-pink-500" text="Find us at Playa Samara, Costa Rica" />
                                <ParagraphComponent className="pt-12 lg:px-10 text-left" text="Nestled on Costa Rica's Pacific coast, Samara Beach is a tranquil haven known for its golden sands and relaxed vibe. Surrounded by lush rainforests, it offers an ideal setting for sunbathing, swimming, and water sports like surfing and snorkeling. With its charming beachfront eateries and vibrant nightlife, Samara is the perfect blend of natural beauty and coastal charm, inviting travelers to unwind and immerse themselves in the pura vida lifestyle." />

                            </div>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15722.87552719769!2d-85.53102140960638!3d9.873935683587385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f9faa01e2091a3d%3A0x341f2d530bcc25b5!2sSamara%20Beach!5e0!3m2!1ssv!2sat!4v1715265028638!5m2!1ssv!2sat" className="px-2 rounded-md h-full w-full" style={{ border: '0' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
                <FooterComponent />
            </div >
        </>
    )
}