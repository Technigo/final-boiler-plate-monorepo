//Import relevant library
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';

//Import relevant components
import { NavigationMenu } from "../components/Common/NavigationMenu";
import { HeadingComponent } from "../components/Reusables/HeadingComponent";
import { FooterComponent } from '../components/Common/FooterComponent';
import { SubHeadingComponent } from '../components/Reusables/SubHeadingComponent';
import { ParagraphComponent } from "../components/Reusables/ParagraphComponent";
import { BtnComponent } from "../components/Reusables/BtnComonent";
import { OurSurfLessonSlider } from "../components/Surflessons/OurSurfLessonSlider"
import { PhotoComponent } from "../components/Reusables/PhotoComponent";

//Import relevant media
import OurSurfLessonPhoto from "../assets/OurSurfLessonPhoto.webp";
import ssurfboardIcon from "../assets/icons/surfboardIcon.webp";
import LeashIcon from "../assets/icons/leashIcon.webp";
import rashGuardIcon from "../assets/icons/rashGuardIcon.webp";
import GiftIcon from "../assets/icons/giftIcon.webp";

export const SurfLessons = () => {

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page when the About component mounts
    }, []);

    const handleButtonClick = () => {
        // Navigate to the "BookNow" page
        navigate('/BookNow');
    };

    //set default bg-style
    const backgroundImageStyle = {
        backgroundImage: `url(${OurSurfLessonPhoto})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',

    };

    return (

        <div className="bg-backgroundPink">

            {/* Set meta description dynamically */}
            <Helmet>
                <meta name="description" content="Experience personalized surf lessons at Playa Samara with Tuanis Surf School. Group and private lessons available. Book now!" />
            </Helmet>

            <NavigationMenu />

            <div className="h-3/6 md:h-5/6 lg:h-screen rounded-b-full" style={backgroundImageStyle}>
                <HeadingComponent text="Our Surf Lessons" level={1} style={{}} />
            </div>

            <div className="bg-backgroundPink mx-6 my-10 md:mx-10">
                <ParagraphComponent className="mt-5 lg:my-14" text="Our surf-lessons are offered at Playa Samara, a beautiful white sand beach surrounded by jungle and mountains.The ocean here is shallow with sand covering the ocean floor. The waves are present enough to learn how to surf but unforgiving enough to enjoy a day playing around in them. Which makes it the perfect place to learn at, Playa Samara is truly home to the friendliest waves to surf on. Each lesson is personalised to fit your specific needs, age, physic and experience. Our instructors are fluent in Spanish, English and Swedish. All of our surf-instructors have different nationalities and we work with both female and male surfers. They all have years of experience and are professionally trained. Our awesome instructors love sharing their stoke for the sport with the local community and tourists. We offer surf coaching for both complete beginners as well as more advanced surfers with a maximum of three students per instructor." />

                <SubHeadingComponent className="lg:px-32" text="Our group-lessons are 2 hours long. 
                    Our private lessons are 1,5 hours long." />

                <ParagraphComponent className="my-10 lg:my-14" text="Each lesson starts with 20-30 minute theory and warm-up on land. Here we will also talk oceansafety, conditions, technique, etiquette and practice our movements on land before heading out in the water. We then spend the rest of our time in the water catching and riding waves and improving your skills." />

                <OurSurfLessonSlider />

                <div className="lg:p-12">
                    <SubHeadingComponent text="All of our lessons include:" />

                    <SubHeadingComponent text="Surf-board" />
                    <div className="flex justify-center items-center">
                        <PhotoComponent className="h-14" src={ssurfboardIcon} alt="Surfboard icon" />
                    </div>

                    <SubHeadingComponent text="Rash-guard" />
                    <div className="flex justify-center items-center">
                        <PhotoComponent className="h-14" src={rashGuardIcon} alt="Rash guard icon" />
                    </div>

                    <SubHeadingComponent text="Leash" />
                    <div className="flex justify-center items-center">
                        <PhotoComponent className="h-14" src={LeashIcon} alt="Leash icon" />
                    </div>
                </div>

                <ParagraphComponent className="my-10" text="We schedule our lessons based off the tides and conditions of the day to ensure that you have the best possible conditions for your personalised lesson. We also have different kind of surf-boards and will be able to offer you one that suits your level." />

                <SubHeadingComponent className="p-10" text="Pricing for our lessons:" />

                <div className="text-center grid gap-8 md:grid-cols-3 lg:grid-cols-3">

                    <div className="border-t-4 md:p-6 border-customPink md:border-l-4 border-customPink py-6 md:border-t-0 md:py-12">
                        <SubHeadingComponent className="my-10" text="Book a package of one lesson:" />
                        <ParagraphComponent text="One groupe lesson $55 (a minimum of 2 people)." />
                        <ParagraphComponent text="One private lesson: $75f-board" />
                        <div className="flex justify-center items-center">
                            <PhotoComponent src={GiftIcon} alt="Gift icon" />
                        </div>
                    </div>

                    <div className="border-y-4 md:p-6 border-customPink md:border-x-4 border-customPink py-6 md:border-y-0 md:py-12">
                        <SubHeadingComponent className="my-10" text="Book a package of 3 lessons:" />
                        <ParagraphComponent text="3 group lessons: $45x3 = $135 in total." />
                        <ParagraphComponent text="3 private lessons: $65x3 = $195 in total" />
                        <div className="flex justify-center items-center">
                            <PhotoComponent src={GiftIcon} alt="Gift icon" />
                        </div>
                    </div>

                    <div className="border-b-4 border-customPink md:border-r-4 md:p-6 border-customPink md:border-b-0 py-6 md:py-12">
                        <SubHeadingComponent className="my-10" text="Book a package of 6 lessons:" />
                        <ParagraphComponent text="6 group lessons: $35x6 = $210 in total." />
                        <ParagraphComponent text="6 Private Lessons: $55x6 = $330 in total" />
                        <div className="flex justify-center items-center">
                            <PhotoComponent src={GiftIcon} alt="Gift icon" />
                        </div>
                    </div>

                </div>

                <div className="flex items-center justify-center p-4 m-6">
                    <BtnComponent label="Book Now" onClick={handleButtonClick} />
                </div>

            </div>
            <FooterComponent />
        </div>


    )
}