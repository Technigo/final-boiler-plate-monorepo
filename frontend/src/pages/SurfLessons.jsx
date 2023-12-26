//Import relevant library
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

//Import relevant components
import { NavigationMenu } from "../components/NavigationMenu";
import { HeadingComponent } from "../components/HeadingComponent";
import { FooterComponent } from '../components/FooterComponent';
import { SubHeadingComponent } from '../components/SubHeadingComponent';
import { ParagraphComponent } from "../components/ParagraphComponent";
import { BtnComponent } from "../components/BtnComonent";
import { OurSurfLessonSlider } from "../components/OurSurfLessonSlider"
import { FadeWrapper } from "../components/Fade";

//Import relevant media
import OurSurfLessonPhoto from "../assets/OurSurfLessonPhoto.jpeg";


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
        <FadeWrapper>
            <div className="">
                <NavigationMenu />
                <div className="h-96 lg:h-screen" style={backgroundImageStyle}>
                    {/* Any content you want on top of the background image */}
                    <HeadingComponent text="Our Surf Lessons" level={1} style={{}} />
                </div>

                <div className="bg-backgroundPink">
                    <ParagraphComponent text="Our surf-lessons are offered at Playa Samara, a beautiful white sand beach surrounded by jungle and mountains.The ocean here is shallow with sand covering the ocean floor. The waves are present enough to learn how to surf but unforgiving enough to enjoy a day playing around in them. Which makes it the perfect place to learn at, Playa Samara is truly home to the friendliest waves to surf on. Each lesson is personalised to fit your specific needs, age, physic and experience. Our instructors are fluent in Spanish, English and Swedish. All of our surf-instructors have different nationalities and we work with both female and male surfers. They all have years of experience and are professionally trained. Our awesome instructors love sharing their stoke for the sport with the local community and tourists. We offer surf coaching for both complete beginners as well as more advanced surfers with a maximum of three students per instructor." />

                    <SubHeadingComponent className="p-12" text="Our group-lessons are 2 hours long. 
                    Our private lessons are 1,5 hours long" />

                    <ParagraphComponent text="Each lesson starts with 20-30 minute theory and warm-up on land. Here we will also talk oceansafety, conditions, technique, etiquette and practice our movements on land before heading out in the water. We then spend the rest of our time in the water catching and riding waves and improving your skills." />

                    <OurSurfLessonSlider />

                    <div className="p-12">
                        <SubHeadingComponent text="All of our lessons include:" />
                        <SubHeadingComponent className="underline decoration-wavy decoration-customPink decoration-8" text="Surf-board" />
                        <SubHeadingComponent className="underline decoration-wavy decoration-customPink decoration-8" text="Rash-guard" />
                        <SubHeadingComponent className="underline decoration-wavy decoration-customPink decoration-8" text="Leash" />
                    </div>

                    <ParagraphComponent text="We schedule our lessons based off the tides and conditions of the day to ensure that you have the best possible conditions for your personalised lesson. We also have different kind of surf-boards and will be able to offer you one that suits your level." />

                    <SubHeadingComponent text="Surfing is an activity for the whole family!" />

                    <ParagraphComponent text="All ages are welcomed! We have a lot of experience working with children of all ages: from as young as 3 years of age to our oldest surfer so far that was 78 years old. Our surf school welcomes everyone, from first timers to seasoned surfers, no matter what age you are. Surfing is also a great family activity, our expert instructors are great with kids and adults. Discover the passion of surfing together and create unforgettable memories in Costa Rica’s surfing paradise. Come and enjoy Playa Samara, our very family-friendly surf spot." />

                    <SubHeadingComponent className="p-10" text="Pricing for our lessons" />

                    <div className="p-12 grid gap-8 md:grid-cols-3 lg:grid-cols-3">

                        <div className="bg-customPink rounded-t-lg py-7">
                            <SubHeadingComponent text="Book one lesson:" />
                            <SubHeadingComponent text="One groupe lesson $55 (a minimum of 2 people)." />
                            <SubHeadingComponent text="One private lesson: $75f-board" />
                        </div>
                        <div className="bg-customPink rounded-t-lg py-7">
                            <SubHeadingComponent text="Book a package of 3 lessons:" />
                            <SubHeadingComponent text="3 group lessons: $45x3 = $135 in total." />
                            <SubHeadingComponent text="3 private lessons: $65x3 = $195 in total" />
                        </div>
                        <div className="bg-customPink rounded-t-lg py-7">
                            <SubHeadingComponent className="" text="Book a package of 6 lessons:" />
                            <SubHeadingComponent className="" text="6 group lessons: $35x6 = $210 in total." />
                            <SubHeadingComponent className="" text="6 Private Lessons: $55x6 = $330 in total" />
                        </div>

                    </div>

                    <div className="flex items-center justify-center p-4">
                        <BtnComponent label="Book Now" onClick={handleButtonClick} />
                    </div>

                </div>

                <FooterComponent />
            </div>
        </FadeWrapper>

    )
}