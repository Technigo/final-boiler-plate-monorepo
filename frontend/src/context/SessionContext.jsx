import { createContext, useContext, useState } from 'react';

const SessionContext = createContext({
    isSessionExpired: false,
    onSessionExpire: () => { }
});

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children, onSessionExpireNavigate }) => {
    const [isSessionExpired, setIsSessionExpired] = useState(false);
  
    const handleSessionExpiration = () => {
      setIsSessionExpired(true);
      onSessionExpireNavigate(); // Call the passed function
      localStorage.removeItem("accessToken");
    };
  
    return (
      <SessionContext.Provider value={{ isSessionExpired, onSessionExpire: handleSessionExpiration }}>
        {children}
      </SessionContext.Provider>
    );
  };