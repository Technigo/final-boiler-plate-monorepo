import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { Fade } from "react-awesome-reveal";

//import components
import { NavigationMenu } from "../components/Common/NavigationMenu"
import { FooterComponent } from "../components/Common/FooterComponent"
import { PostBookingComponent } from "../components/Bookings/PostBookingComponent"
import { HeadingComponent } from "../components/Reusables/HeadingComponent"
import { SubHeadingComponent } from "../components/Reusables/SubHeadingComponent"
import { ParagraphComponent } from "../components/Reusables/ParagraphComponent";
//import media 
import BookNowPhoto from "../assets/bookNow/BookNowPhoto.webp";

export const BookNow = () => {

    useEffect(() => {
        console.log("Scrolling to the top");
        window.scrollTo(0, 0);
    }, []);

    const backgroundImageStyle = {
        backgroundImage: `url(${BookNowPhoto})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // Default backgroundSize for larger screens
        backgroundSize: 'cover'

    };
    return (

        <div className="bg-backgroundPink">

            {/* Set meta description dynamically */}
            <Helmet>
                <meta name="description" content="Book your surf lesson with Tuanis Surf School now. Join us for an exciting and fun surfing experience. Learn to surf with our experienced instructors." />
            </Helmet>

            <NavigationMenu />

            <div className="lg:h-screen" style={backgroundImageStyle}>
                <HeadingComponent text="Book Now"
                    level={1} style={{}} />
            </div>

            {/* Rolling text */}
            <marquee behavior="scroll" scrollamount="7" className="font-bold text-2xl text-pink-500" direction="left">Come Surf with us!</marquee>

            <marquee behavior="scroll" scrollamount="5" className="font-bold text-2xl text-pink-500" direction="left">For all ages!</marquee>

            <marquee behavior="scroll" scrollamount="3" className="font-bold text-2xl text-pink-500" direction="left">Female instructors!</marquee>

            <Fade>
                <div className="lg:h-screen justify-center items-center text-center pt-20">
                    <Fade>
                        <SubHeadingComponent className="px-6 md:text-5xl text-pink-500 pb-5" text="Book a session by getting in contact with us right away. Give us a call or text us on Whatsapp at" />
                        <a className="px-6 text-2xl md:text-5xl lg:p-16 text-pink-500 text-center hover:text-fuchsia-900 transition duration-300 ease-in-out" href="tel:+50661407609">+50661407609</a>

                        <SubHeadingComponent className="px-6 md:text-5xl pb-5 text-pink-500" text="or email us at" />
                        <a className="px-6 text-2xl md:text-5xl lg:p-16 text-pink-500 text-center hover:text-fuchsia-900 transition duration-300 ease-in-out" href="mailto:tuanissurfschool@gmail.com">tuanissurfschool@gmail.com</a>

                    </Fade>
                    <Fade>
                        <SubHeadingComponent className="px-6 md:text-3xl pb-10 text-pink-500" text="Or scroll down and send us a booking request -we will get back to you!" />
                    </Fade>
                </div>

            </Fade>

            <Fade>
                <div className="my-10 mx-6">
                    <PostBookingComponent />
                </div>
            </Fade>
            <FooterComponent />
        </div>
    )
}