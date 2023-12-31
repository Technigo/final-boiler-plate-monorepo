/* eslint-disable react/prop-types */
import "./button.css"

export const Button = ({ className, handleOnClick, btnText }) => {

    return (
        <button 
        className={className} 
        onClick={handleOnClick} 
        type="submit"
        
        >
        {btnText}
        </button>
    )
}