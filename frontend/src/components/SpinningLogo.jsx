import '../logo.css'
import logo from '../assets/logo.png';

export const SpinningLogo = () => {
    const isLogoSpinning = true; // or false, depending on your logic

    return (
        <a href="/home">
            <img
                className={`w-56 ${isLogoSpinning ? 'animate-spin' : ''}`}
                src={logo}
                style={{ animation: `spin 3s linear infinite` }} // Adjust the duration (e.g., 4s)
                alt="logo"
            />
        </a>
    );
};

