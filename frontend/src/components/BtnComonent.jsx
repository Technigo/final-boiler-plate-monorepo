export const BtnComponent = ({ label, onClick, className }) => {
    // You can use template literals to concatenate Tailwind CSS classes
    const defaultClasses = 'bg-customPink h-16 w-22 font-bold py-2 px-4 rounded';

    return (
        <button onClick={onClick} className={`${defaultClasses} ${className}`}>
            {label}
        </button>
    );
};

