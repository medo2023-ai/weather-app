import Info from "./info";
import WeatherContent from "./weather-content";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
   
export default function  Weather(){
    const {  i18n } = useTranslation();
    const[direction,changeDirection]=useState(false);
     const toggleLanguage = () => {
        const newLang = i18n.language === "ar" ? "en" : "ar";
       
        if(newLang==="ar"){
            changeDirection(false)
        }
        else{
            changeDirection(true)

        }
         i18n.changeLanguage(newLang);
    };
    return(
        <>
        <section className="weather-box" style={{direction:direction?"ltr":"rtl"}}> 
            <Info change={direction}/>
           <hr/>
           <WeatherContent change={direction}/>
        </section>
          <button onClick={toggleLanguage} style={{ marginBottom: "20px" }}>
                {i18n.language === "ar" ? "الإنجليزية" : "arabic"}
            </button>
        </>
    )
}