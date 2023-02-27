import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Nachrichten.module.css";
import brokenCloudsImg from "../public/weather-icons/brokenClouds.svg";
import clearSkyImg from "../public/weather-icons/clearSky.svg";
import fewCloudsImg from "../public/weather-icons/fewClouds.svg";
import mistImg from "../public/weather-icons/mist.svg";
import showerRainImg from "../public/weather-icons/showerRain.svg";
import rainImg from "../public/weather-icons/rain.svg";
import snowImg from "../public/weather-icons/snow.svg";
import thunderstormImg from "../public/weather-icons/thunderstorm.svg";

interface IWeatherData {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
}

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Aachen&inc=main,weather,wind&units=metric&appid=${API_KEY}&units=metric`;

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState<IWeatherData>();
  const fetchWeawer = () => {
    axios.get(currentWeatherUrl).then((res) => {
      setWeatherData(res.data);
    });
  };
  useEffect(() => {
    fetchWeawer();
  }, []);
  const dateDay = new Date().toLocaleDateString("de-us", {
    weekday: "long",
  });

  const hourNumeric = new Date().toLocaleDateString("de-GB", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className={styles.weatherCard}>
      <h1 className={styles.cityName}>{weatherData?.name}</h1>
      <h2 className={styles.todayDate}>
        Wetter {dateDay} {hourNumeric}Uhr
      </h2>
      <div className={styles.mainData}>
        <div className={styles.imgContainer}>
          <Image
            src={
              weatherData?.weather[0].description === "broken clouds" ||
              weatherData?.weather[0].description === "scattered clouds" ||
              weatherData?.weather[0].description === "overcast clouds"
                ? brokenCloudsImg
                : weatherData?.weather[0].description === "clear sky"
                ? clearSkyImg
                : weatherData?.weather[0].description === "few clouds"
                ? fewCloudsImg
                : weatherData?.weather[0].description === "mist" ||
                  weatherData?.weather[0].description === "Smoke" ||
                  weatherData?.weather[0].description === "Haze" ||
                  weatherData?.weather[0].description === "sand/ dust whirls" ||
                  weatherData?.weather[0].description === "fog" ||
                  weatherData?.weather[0].description === "sand" ||
                  weatherData?.weather[0].description === "dust" ||
                  weatherData?.weather[0].description === "volcanic ash" ||
                  weatherData?.weather[0].description === "squalls" ||
                  weatherData?.weather[0].description === "tornado"
                ? mistImg
                : weatherData?.weather[0].description === "light rain" ||
                  weatherData?.weather[0].description ===
                    "light intensity drizzle" ||
                  weatherData?.weather[0].description === "rain" ||
                  weatherData?.weather[0].description === "moderate rain"
                ? rainImg
                : weatherData?.weather[0].description === "shower rain" ||
                  weatherData?.weather[0].description ===
                    "heavy intensity shower rain" ||
                  weatherData?.weather[0].description ===
                    "ragged shower rain" ||
                  weatherData?.weather[0].description ===
                    "light intensity shower rain" ||
                  weatherData?.weather[0].description === "extreme rain" ||
                  weatherData?.weather[0].description ===
                    "heavy intensity rain" ||
                  weatherData?.weather[0].description === "very heavy rain" ||
                  weatherData?.weather[0].description == "Drizzle" ||
                  weatherData?.weather[0].description ===
                    "heavy intensity drizzle" ||
                  weatherData?.weather[0].description === "drizzle rain" ||
                  weatherData?.weather[0].description ===
                    "heavy intensity drizzle rain" ||
                  weatherData?.weather[0].description === "shower drizzle" ||
                  weatherData?.weather[0].description ===
                    "heavy shower rain and drizzle" ||
                  weatherData?.weather[0].description ===
                    "shower rain and drizzle"
                ? showerRainImg
                : weatherData?.weather[0].description === "snow" ||
                  weatherData?.weather[0].description === "freezing rain" ||
                  weatherData?.weather[0].description === "light snow" ||
                  weatherData?.weather[0].description === "Heavy snow" ||
                  weatherData?.weather[0].description === "Sleet" ||
                  weatherData?.weather[0].description ===
                    "Light shower sleet" ||
                  weatherData?.weather[0].description === "Shower sleet" ||
                  weatherData?.weather[0].description ===
                    "Light rain and snow" ||
                  weatherData?.weather[0].description === "Rain and snow" ||
                  weatherData?.weather[0].description === "Light shower snow" ||
                  weatherData?.weather[0].description === "Shower snow" ||
                  weatherData?.weather[0].description === "Heavy shower snow"
                ? snowImg
                : weatherData?.weather[0].description === "thunderstorm" ||
                  weatherData?.weather[0].description ===
                    "thunderstorm with light rain" ||
                  weatherData?.weather[0].description ===
                    "thunderstorm with rain" ||
                  weatherData?.weather[0].description ===
                    "thunderstorm with heavy rain" ||
                  weatherData?.weather[0].description ===
                    "light thunderstorm" ||
                  weatherData?.weather[0].description ===
                    "heavy thunderstorm" ||
                  weatherData?.weather[0].description ===
                    "ragged thunderstorm" ||
                  weatherData?.weather[0].description ===
                    "thunderstorm with light drizzle" ||
                  weatherData?.weather[0].description ===
                    "thunderstorm with drizzle" ||
                  weatherData?.weather[0].description ===
                    "thunderstorm with heavy drizzle"
                ? thunderstormImg
                : clearSkyImg
            }
            alt="Weather icon"
          />
        </div>
        {weatherData && <h1>{Math.round(weatherData.main.temp)}°C</h1>}
        <h2>{weatherData?.weather[0].main}</h2>
      </div>
      {weatherData && (
        <div className={styles.listData}>
          <p className="pl-3 w-full text-left">Temperatur</p>
          <p>
            {Math.round(weatherData.main.temp_min)}...
            {Math.round(weatherData.main.temp_max)}°C
          </p>
          <p className="pl-3  w-full text-left">Wind</p>
          <p>{Math.round(weatherData.wind.speed)} m/s</p>
          <p className="pl-3  w-full text-left">Luftfeuchtigkeit</p>
          <p>{Math.round(weatherData.main.humidity)}%</p>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
