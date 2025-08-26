import { Con } from "../js/context";
import { useContext } from "react";
  import 'moment/min/locales';
import countries from "i18n-iso-countries";
import arLocale from "i18n-iso-countries/langs/ar.json";
import enLocale from "i18n-iso-countries/langs/en.json";
export default function Info({change}){
    if(change){
        countries.registerLocale(enLocale);
    }
    else{
        countries.registerLocale(arLocale);
    }
    const now = new Intl.DateTimeFormat(
    change ?  "en-US":"ar-EG",
    {
      day: "numeric", 
      month: "long",    
      year: "numeric", 
    }
).format(new Date());
    const{country}=useContext(Con)
    return(
         <div className="info">
        <div className="country">
            <h2 style={{fontSize:"2rem"}}>{change?countries.getName(country, "en"):countries.getName(country, "ar")}</h2>
        </div>
        <div className="date">
            <h5>{now}</h5>
        </div>
    </div>
    )
   
}