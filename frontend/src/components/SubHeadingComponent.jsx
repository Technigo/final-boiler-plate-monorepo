import "../font.css"

export const SubHeadingComponent = ({ text, className }) => {
    // You can use template literals to concatenate Tailwind CSS classes
    const defaultClasses = 'text-center text-3xl font-josefin-sans bg-backgroundPink max-w-3xl mx-auto'; // You can customize this based on your design

    return (
        <h2 className={`${defaultClasses} ${className}`}>{text}</h2>
    );
};


