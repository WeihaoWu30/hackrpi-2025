import React, { createContext, useState, useContext } from 'react';

const AlertContext = createContext();

export const AlertProvider = ({children}) =>{
  const [alert, setAlert] = useState([]);

  const updateAlert = (newText) => {
    setAlert(prev => [...prev, newText]); 
  };
  
  const clearAlert = () => {
    setAlert([]);
  };

  const value = {
   alert,
   updateAlert,
   clearAlert
  };

  return(
   <AlertContext.Provider value={value}>
      {children}
   </AlertContext.Provider>
  );
};

export const useAlert = () =>{
   return useContext(AlertContext);
}