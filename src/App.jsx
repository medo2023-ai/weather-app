import Weather from './compentents/weather';
import './App.css';
import { useState } from 'react';
import { Con } from './js/context';
function App() {
  const[country,setCountry]=useState(null);
  

  return (
    <>
    <Con.Provider value={{country,setCountry}}>
      <Weather/>
     
      
    </Con.Provider>
    
    </>
  )
}

export default App
