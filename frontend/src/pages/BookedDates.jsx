import Modal from 'react-modal';
import { useState } from 'react';
import { SortedByDate } from "../components/Bookings/SortedByDate"
import { SubHeadingComponent } from "../components/Reusables/SubHeadingComponent"
import { DropDownComponent } from "../components/Common/DropDownComponent"
import { ReusableModal } from '../components/Reusables/ReusableModal';
import { BtnComponent } from '../components/Reusables/BtnComonent';

export const BookedDates = () => {
    const [aboutModalIsOpen, setAboutModalIsOpen] = useState(false);

    const openAboutModal = () => {
        setAboutModalIsOpen(true);
    };

    const closeAboutModal = () => {
        setAboutModalIsOpen(false);
    };
    const aboutThisPageText = (
        <>
            Welcome to the Booking Overview Page!<br />
            This page provides an organized view of accepted surfing bookings sorted by date.<br />
            The colorful sections represent different dates, each displaying the total number of bookings for that day.<br />
            - Color Codes:<br />
            - Green: 1-5 bookings<br />
            - Orange: 6-9 bookings<br />
            - Red: 10 or more bookings<br />
            Click on the "Open booking" button to explore detailed information about bookings on a specific date.<br />
            The modal window will reveal comprehensive details about each booking, including the surfer's name, age, weight, height, and more.<br />
            Feel free to navigate, explore, and manage bookings effortlessly with this intuitive interface!<br /><br />
            Note: The first date shown is the closest date to today.
        </>
    );

    return (
        <div>

            <BtnComponent className="mx-6 bg-gray-800 m-1 hover:bg-gray-600 text-white" onClick={() => openAboutModal()} label="About this page" />

            <ReusableModal
                isOpen={aboutModalIsOpen}
                onRequestClose={closeAboutModal}
                contentLabel="About This Page Modal"
                modalTitle="About This Page">
                {aboutThisPageText}
            </ReusableModal>

            <SubHeadingComponent text="Booking sorted by date" />

            <div className="flex justify-center items-center">
                <DropDownComponent />
            </div>

            <SortedByDate />
        </div>
    )

}
