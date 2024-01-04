import { ParagraphComponent } from "./ParagraphComponent";
import { SpinningLogo } from "./SpinningLogo";
import { BtnComponent } from "./BtnComonent";

export const SucessMessage = () => {

    const handleBookAgain = () => {
        window.location.reload();
    }
    return (
        <div className="flex text-center flex-col items-center h-auto m-9">
            <SpinningLogo />
            <ParagraphComponent className="" text="Thank you for your booking request!" />

            <ParagraphComponent className="" text="Tuanis Surfschool will get back to you as soon as possible. Don't forget to check your email!" />

            <ParagraphComponent className="" text="If you have any questions in the meantime don't hesitate to get in touch with us at tuanissurfschool@gmail.com or +506 6140-7609." />

            <BtnComponent className="mb-18" label="Send another request" onClick={handleBookAgain} />
        </div>
    )
}


