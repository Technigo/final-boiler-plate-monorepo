import '../../../src/logo.css'
import logo from '../../assets/logo.webp';

export const SpinningLogo = () => {
    const isLogoSpinning = true; // or false, depending on your logic

    return (
        <a href="/home">
            <img
                className={`w-56 h-56 ${isLogoSpinning ? 'animate-spin' : ''}`}
                src={logo}
                style={{ animation: `spin 3s linear infinite` }}
                alt="logo"
            />
        </a>
    );
};

