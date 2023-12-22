//import './typography.css'

export const Heading = ({ level, text, className }) => {
    const Tag = `h${level}`;
    return <Tag className={className}>{text}</Tag>;
};

//Define default and customizable props
Heading.defaultProps = {
    level: 1, // Default to h1
    className: '',
};


{/* THIS IS HOW YOU USE IT 
    <Heading level={1} text="Main Heading" aria-label="This is the main heading" className="give-it-a-name" />
*/}