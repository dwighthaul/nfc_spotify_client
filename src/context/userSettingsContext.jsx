import React, { createContext, useState, useContext, useEffect } from 'react';

const MyContext = createContext();

export const UserSettingsProvider = ({ children }) => {
  const [isClientIdAndSecret, setIsClientIdAndSecret] = useState(false);

  useEffect(() => {
    setIsClientIdAndSecret(sessionStorage.getItem("SettingsAreOk") ?? false);
  }, []);



  const userHasClienIdAndSecret = (settingsOk) => {
    setIsClientIdAndSecret(settingsOk);
  };


  return (
    <MyContext.Provider value={{ isClientIdAndSecret, userHasClienIdAndSecret }}>
      {children}
    </MyContext.Provider>
  );
};

export const UserSettingsContext = () => useContext(MyContext);