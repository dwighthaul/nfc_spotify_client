import React, { createContext, useState, useContext, useEffect } from 'react';

const MyContext = createContext();

export const UserProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(sessionStorage.getItem("isConnected") ?? false);
  }, []);


  const userIsConnected = () => {
    setIsConnected(true);
  };

  const userIsDisconnected = () => {
    setIsConnected(false);
  };

  return (
    <MyContext.Provider value={{ isConnected, userIsConnected, userIsDisconnected }}>
      {children}
    </MyContext.Provider>
  );
};

export const UserContext = () => useContext(MyContext);