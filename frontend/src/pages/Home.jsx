import { NavigationMenu } from "../components/Common/NavigationMenu";
import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";

//Import relevant components
import { HeadingComponent } from "../components/Reusables/HeadingComponent";
import { FooterComponent } from '../components/Common/FooterComponent';
import { SubHeadingComponent } from '../components/Reusables/SubHeadingComponent';
import { PhotoComponent } from "../components/Reusables/PhotoComponent";
import { ParagraphComponent } from "../components/Reusables/ParagraphComponent";
import { BtnComponent } from "../components/Reusables/BtnComonent";

//import relevant media
import home1 from "../assets/home/home1.webp";
import home2 from "../assets/home/home2.webp";
import surfPhotography from "../assets/home/surfPhotography.webp"
import OurSurfLessonPhoto from "../assets/surfLessons/OurSurfLessonPhoto1.webp";
import VideoBackground from "../assets/home/backgroundFilm.mp4"

export const Home = () => {

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page when the About component mounts
    }, []);


    const navigate = useNavigate();

    const handleWhoAreWenClick = () => {
        // Navigate to the "WhoAreWe" page
        navigate('/WhoAreWe');
    };

    const handleTripAdvisorClick = () => {
        window.open('https://www.tripadvisor.se/Attraction_Review-g309247-d19787493-Reviews-Tuanis_Surf_School_CR-Playa_Samara_Province_of_Guanacaste.html', '_blank');
    };

    const handleSurfLessonClick = () => {
        // Navigate to the "WhoAreWe" page
        navigate('/SurfLessons');
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://static.elfsight.com/platform/platform.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="h-auto bg-backgroundPink">
            <NavigationMenu />

            <div className="relative h-fit overflow-hidden">
                {/* Set meta description dynamically */}
                <Helmet>
                    <meta name="description" content="Welcome to Tuanis Surf School! Learn to surf and have fun with our experienced instructors." />
                </Helmet>


                {/* Background Video */}
                <video autoPlay muted loop playsInline controls={false} className="object-cover w-full h-screen top-0 left-0 z-0" style={{ filter: 'brightness(100%)' }}>
                    <source src={VideoBackground} type="video/mp4" />
                </video>

                <Fade>
                    {/* Heading */}
                    <div className="text-center relative">
                        <HeadingComponent className="pb-0" text="Tuanis Surf School" style={{}} />
                    </div>


                    <div className="bg-backgroundPink mx-6 mt-10 md:mx-10 lg:text-center">
                        <SubHeadingComponent className="px-6 md:text-5xl lg:p-16 text-pink-500" text="We believe that the most important part of surfing is to have fun. If you’re not having fun, you’re doing it wrong!" />

                        <ParagraphComponent className="mt-10" text="Tuanis Surf School is a small family owned business at Samara Beach founded
                        by Sofie, who is passionated about sharing her love for surfing and the ocean.
                        Our team of employees are all about the good life and we think that you are too. We are lucky enough to get guests from all over the world who come together to surf and enjoy our little piece of paradise. At Tuanis Surf School we have a great family vibe where you will instantly feel a sense of belonging." />
                    </div>

                </Fade>

                {/* Grid */}
                <div className="my-36 mx-6">

                    {/* surf with us */}
                    <div className="mt-10 grid gap-2 md:grid-cols-1 lg:grid-cols-2 justify-center items-center">
                        <PhotoComponent className="rounded-md" src={home1} alt="Home" />
                        <div className="flex flex-col justify-center items-center">
                            <SubHeadingComponent className="px-6 md:text-5xl font-josefin-sans lg:p-16 text-pink-500" text="Surf with us to enjoy a social atmosphere and have a great time while making memories for life." />
                            <BtnComponent label="About us - who are we?" onClick={handleWhoAreWenClick} />
                        </div>
                    </div>

                    {/* tripadvisor */}
                    <div className="mt-10 grid gap-2 md:grid-cols-1 lg:grid-cols-2 justify-center items-center">
                        <div className="flex flex-col justify-center items-center">
                            <SubHeadingComponent className="px-6 md:text-5xl font-josefin-sans lg:p-16 text-pink-500" text='"...if I had to take the trip again I would pick Tuanis surf school everytime!"' />
                            <BtnComponent label="Read our reviews on TripAdvisor" onClick={handleTripAdvisorClick} />
                        </div>
                        <PhotoComponent className="rounded-md mt-10" src={home2} alt="Home" />
                    </div>

                    {/* all levels */}
                    <div className="mt-10 grid gap-2 md:grid-cols-1 lg:grid-cols-2">
                        <PhotoComponent className="rounded-md" src={OurSurfLessonPhoto} alt="Home" />
                        <div className="flex flex-col justify-center items-center mb-16">
                            <SubHeadingComponent className="px-6 md:text-5xl font-josefin-sans lg:p-16 text-pink-500" text="WE OFFER SURF-LESSONS FOR ALL LEVELS AT: SAMARA BEACH" />
                            <BtnComponent label="Read about our Surf Lessons" onClick={handleSurfLessonClick} />
                        </div>
                    </div>

                    {/* photography */}
                    <div className="mt-10 grid gap-2 md:grid-cols-1 lg:grid-cols-2">
                        <div className="flex flex-col justify-center items-center mb-16">
                            <SubHeadingComponent className="px-6 md:text-5xl font-josefin-sans lg:p-16 text-pink-500" text="SURF PHOTOGRAPHY! Let us document your jurney!" />
                            <BtnComponent label="Read about our Surf Photography" onClick={handleWhoAreWenClick} />
                        </div>
                        <PhotoComponent className="rounded-md" src={surfPhotography} alt="Home" />
                    </div>
                </div>

                {/* tripadvisor reviews */}
                <div className="elfsight-app-4b8aafd5-e789-4bb3-b1f8-d3045fba6253" data-elfsight-app-lazy></div>

                <FooterComponent />
            </div>
        </div>
    );
};
