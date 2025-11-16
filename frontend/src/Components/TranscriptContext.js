import React, { createContext, useState, useContext } from 'react';

const TranscriptContext = createContext();

export const TranscriptProvider = ({children}) =>{
  const [transcript, setTranscript] = useState("");

  const updateTranscript = (newText) => {
    setTranscript(prev => prev + newText); 
  };
  
  const clearTranscript = () => {
    setTranscript("");
  };

  const value = {
   transcript,
   updateTranscript,
   clearTranscript
  };

  return(
   <TranscriptContext.Provider value={value}>
      {children}
   </TranscriptContext.Provider>
  );
};

export const useTranscript = () =>{
   return useContext(TranscriptContext);
}