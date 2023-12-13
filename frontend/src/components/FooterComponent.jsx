import React from 'react';
import { PhotoComponent } from "./PhotoComponent";
import tripAdvicerLogo from "../assets/icons/tripAdvisorLogo.png";
import facebookLogo from "../assets/icons/facebookLogo.png";
import instagramLogo from "../assets/icons/instagramLogo.png";

export const FooterComponent = ({ className }) => {
    // You can use template literals to concatenate Tailwind CSS classes
    const defaultClasses = 'bg-customPink text-l font-josefin-sans p-5 bg-backgroundPink'; // You can customize this based on your design

    return (
        <div className="bg-customPink flex items-center justify-between h-24">

            <div className="bg-customPink flex items-center ml-20">
                <PhotoComponent img={tripAdvicerLogo} className="mr-20" />
                <PhotoComponent img={facebookLogo} className="mr-20" />
                <PhotoComponent img={instagramLogo} />
            </div>

            <div className="bg-customPink items-center flex px-10">
                <p className={`${defaultClasses} mr-5 ${className}`}>Email: tuanissurfschool@gmail.com </p>
                <p className={`${defaultClasses} ${className}`}>Phone: +506 6140-7609 </p>
            </div>

        </div>
    );
};
