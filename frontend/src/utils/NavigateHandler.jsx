import { useNavigate } from 'react-router-dom';
import { SessionProvider } from "../context/SessionContext";

const NavigateHandler = ({ children }) => {
  const navigate = useNavigate();

  const handleSessionExpireNavigate = () => {
    navigate("/login");
  };

  return (
    <SessionProvider onSessionExpireNavigate={handleSessionExpireNavigate}>
      {children}
    </SessionProvider>
  );
};

export default NavigateHandler;
