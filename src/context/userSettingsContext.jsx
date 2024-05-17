import React, { createContext, useState, useContext, useEffect } from 'react';

const MyContext = createContext();

export const UserSettingsProvider = ({ children }) => {
  const [isClientIdAndSecret, setIsClientIdAndSecret] = useState(false);

  useEffect(() => {
    setIsClientIdAndSecret(sessionStorage.getItem("SettingsAreOk") ?? false);
  }, []);



  const userHasClienIdAndSecret = (settingsOk) => {
    // On sauvegarde dans la session au cas ou une refresh f5 est fait=> comme ça ça permet de regarder si SettingsAreOk 
    // existe au moment du montage du contexte
    sessionStorage.setItem("SettingsAreOk", settingsOk);
    setIsClientIdAndSecret(settingsOk);
  };


  return (
    <MyContext.Provider value={{ isClientIdAndSecret, userHasClienIdAndSecret }}>
      {children}
    </MyContext.Provider>
  );
};

export const UserSettingsContext = () => useContext(MyContext);