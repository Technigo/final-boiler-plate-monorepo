

export const ParagraphComponent = ({ text, className, category }) => {
    // You can use template literals to concatenate Tailwind CSS classes
    const defaultClasses = 'p-2 text-lg font-josefin-sans bg-backgroundPink max-w-4xl mx-auto'; // Adjust max-w-2xl based on your design

    return (
        <p className={`${defaultClasses} ${className}`}>
            {category && <span className="font-bold">{category}:</span>} {text}
        </p>
    );
};
