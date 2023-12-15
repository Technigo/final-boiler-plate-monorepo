/* eslint-disable react/prop-types */
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