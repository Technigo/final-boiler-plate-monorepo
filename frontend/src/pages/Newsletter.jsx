import { NewsLetterListComponent } from "../components/Newsletter/NewsLetterListComponent"
import { DropDownComponent } from "../components/Common/DropDownComponent"
import { BtnComponent } from "../components/Reusables/BtnComonent"
import { SubHeadingComponent } from "../components/Reusables/SubHeadingComponent"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { userStore } from "../stores/userStore";
import { ReusableModal } from "../components/Reusables/ReusableModal"

export const Newsletter = () => {
    const [aboutModalIsOpen, setAboutModalIsOpen] = useState(false);

    const storeHandleLogout = userStore((state) => state.handleLogout);

    // Use the 'useNavigate' hook to programmatically navigate between routes.
    const navigate = useNavigate();

    // Get 'isLoggedIn' and 'accessToken' from the 'userStore'.
    const { isLoggedIn, accessToken } = userStore();
    console.log(isLoggedIn);
    console.log(accessToken);

    // useEffect hook to check user authentication status.
    useEffect(() => {
        if (!isLoggedIn) {
            // If the user is not logged in, show an alert and navigate to the login route.
            alert("No permission - please log in");
            navigate("/"); // You can change this to the login route
        }
    }, [isLoggedIn]);

    // Function to handle the click event of the logout button.
    const onLogoutClick = () => {
        storeHandleLogout(); // Call the 'handleLogout' function from 'userStore'.
        // Additional logic after logout can be added here.
        alert("Log out successful");
        navigate("/"); // You can change this to the login route
    };
    const openAboutModal = () => {
        setAboutModalIsOpen(true);
    };

    const closeAboutModal = () => {
        setAboutModalIsOpen(false);
    };
    const aboutThisPageText = (
        <>
            Welcome to the Subscribers Overview Page!<br />
            This page provides an organized view of your subscribers.<br />
            You can copy the subscribers list, and delete single subscribers.
            Feel free to navigate, explore, and manage subscribers effortlessly with this intuitive interface!<br /><br />

        </>
    );

    return (
        <div className="h-screen mx-6">

            <BtnComponent className="mx-6 bg-gray-800 m-1 hover:bg-gray-600 text-white" onClick={() => openAboutModal()} label="About this page" />

            <ReusableModal
                isOpen={aboutModalIsOpen}
                onRequestClose={closeAboutModal}
                contentLabel="About This Page Modal"
                modalTitle="About This Page">
                {aboutThisPageText}
            </ReusableModal>

            <div className="flex items-center justify-center p-4">
                <BtnComponent className='mx-6 bg-gray-800 m-1 hover:bg-gray-600 text-white' label="Logout" onClick={onLogoutClick} />
            </div>

            <div className="flex flex-col items-center justify-center p-4">
                <SubHeadingComponent text="Newletter subscriptions" />
                <DropDownComponent />

            </div>
            <NewsLetterListComponent />
        </div>

    )
}