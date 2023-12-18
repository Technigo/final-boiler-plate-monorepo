import { useNavigate } from "react-router-dom";

import { NavigationMenu } from "../components/NavigationMenu";
import { HeadingComponent } from "../components/HeadingComponent";
import { FooterComponent } from '../components/FooterComponent';
import { SubHeadingComponent } from '../components/SubHeadingComponent';
import { ParagraphComponent } from "../components/ParagraphComponent";

import { BtnComponent } from "../components/BtnComonent";
import { OurSurfLessonSlider } from "../components/OurSurfLessonSlider"
//Hero img
import OurSurfLessonPhoto from "../assets/OurSurfLessonPhoto.jpeg";
//other img


export const SurfLessons = () => {

    const navigate = useNavigate();

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
        <>
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

                    <OurSurfLessonSlider />

                    <ParagraphComponent text="Each lesson starts with 20-30 minute theory and warm-up on land. Here we will also talk oceansafety, conditions, technique, etiquette and practice our movements on land before heading out in the water. We then spend the rest of our time in the water catching and riding waves and improving your skills." />

                    <div className="p-12">
                        <SubHeadingComponent text="All of our lessons include:" />
                        <SubHeadingComponent text="Surf-board" />
                        <SubHeadingComponent text="Rash-guard" />
                        <SubHeadingComponent text="Leash" />
                    </div>

                    <ParagraphComponent text="We schedule our lessons based off the tides and conditions of the day to ensure that you have the best possible conditions for your personalised lesson. We also have different kind of surf-boards and will be able to offer you one that suits your level." />

                    <SubHeadingComponent text="Surfing is an activity for the whole family!" />

                    <ParagraphComponent text="All ages are welcomed! We have a lot of experience working with children of all ages: from as young as 3 years of age to our oldest surfer so far that was 78 years old. Our surf school welcomes everyone, from first timers to seasoned surfers, no matter what age you are. Surfing is also a great family activity, our expert instructors are great with kids and adults. Discover the passion of surfing together and create unforgettable memories in Costa Rica’s surfing paradise. Come and enjoy Playa Samara, our very family-friendly surf spot." />

                    <div className="p-12 grid gap-8 md:grid-cols-3 lg:grid-cols-3">

                        <div className="">
                            <SubHeadingComponent className="bg-customPink p-10 rounded-t-lg" text="Pricing for our lessons:" />
                            <SubHeadingComponent className="bg-customPink p-10 rounded-b-lg" text="SurGroup Lesson: $55 (a minimum of 2 people) Private Lesson: $75f-board" />
                        </div>
                        <div>
                            <SubHeadingComponent className="bg-customPink p-10 rounded-t-lg" text="Book a package of 3 lessons:" />
                            <SubHeadingComponent className="bg-customPink p-10 rounded-b-lg" text="3 Group Lessons: $45x3 = $135 in total 3 Private Lessons: $65x3 = $195 in total" />
                        </div>
                        <div>
                            <SubHeadingComponent className="bg-customPink p-10 rounded-t-lg" text="Book a package of 6 lessons:" />
                            <SubHeadingComponent className="bg-customPink p-10 rounded-b-lg" text="6 Group Lessons: $35x6 = $210 in total 6 Private Lessons: $55x6 = $330 in total" />
                        </div>

                    </div>

                    <div className="flex items-center justify-center p-4">
                        <BtnComponent label="Book Now" onClick={handleButtonClick} />
                    </div>

                </div>

                <FooterComponent />
            </div>

        </>
    )
}