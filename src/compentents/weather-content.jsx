
import { useEffect, useContext } from "react";
import { Con } from "../js/context";
import CloudIcon from '@mui/icons-material/Cloud';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../features/api/apiSlice";

export default function WeatherContent({change}) {
    const { t, i18n } = useTranslation();
    const { setCountry } = useContext(Con);
    const dispatch=useDispatch();
    useSelector((state)=>console.log(state));
    const temp=useSelector((state)=>state.weather);
    const weather = new Intl.NumberFormat(change ? "en-US" : "ar-EG").format(temp.temp);
const tempMin = new Intl.NumberFormat(change ? "en-US" : "ar-EG").format(temp.temp_min);
const tempMax = new Intl.NumberFormat(change ? "en-US" : "ar-EG").format(temp.temp_max);

    useEffect(() => {
        i18n.changeLanguage("ar");
    }, [i18n]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((response) => {
                const lat = response.coords.latitude;
                const lon = response.coords.longitude;

               dispatch(fetchWeather({lat,lon}));
               setCountry(temp.country)
            });
        }
    }, [setCountry,dispatch,temp.country]);
   
    return (
      <>
         <div className="weather-content">
          

            <div className="weather-main">
              {temp.loading?(
                <div className="loading"></div>
              ):(
                <>
                   <div className="weather-temp">
                    <h1>{weather}<sup>{t("°C")}</sup></h1>
                    <img 
  src={ `http://openweathermap.org/img/wn/${temp.icon}@2x.png`} 
  alt="weather icon" 
/>

                </div>
                <div className="weather-details">
                    <h5>{t(temp.description)}</h5>
                    <p>{t("min")}: {tempMin} | {t("max")}: {tempMax}</p>
                </div>
                </>
               
              )
              }
            </div>
            <div className="weather-extra">
                <CloudIcon style={{ fontSize: "200px" ,width:"300px"}} />
            </div>
        </div>
      </>
     
    );
}
