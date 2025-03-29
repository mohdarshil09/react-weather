import { useEffect, useState } from "react";
import { TbSearch } from "react-icons/tb";
import { TbMoon, TbSun } from "react-icons/tb";
import axios from "axios";
import "./App.css";
import DetailsCard from "./Components/DetailsCard";
import SummaryCard from "./Components/SummaryCard";
import Astronaut from "./asset/not-found.svg";
import SearchPlace from "./asset/search.svg";

function App() {
  const API_KEY = "533bd1f830d753ba06c009acf23b945d";
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [countries, setCountries] = useState([]);
  const [countryMatch, setCountryMatch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const loadCountries = async () => {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data.map((country) => country.name.official));
    };
    loadCountries();
  }, []);

  const getWeather = async (location) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric&cnt=5`
      );
      setWeatherData(response.data);
      setCity(`${response.data.city.name}, ${response.data.city.country}`);
      setNoData("");
    } catch {
      setWeatherData(null);
      setCity("Location Not Found");
      setNoData("Location Not Found");
    } finally {
      setLoading(false);
    }
  };

  const searchCountries = (input) => {
    setSearchTerm(input);
    setCountryMatch(
      input
        ? countries.filter((country) =>
            country.toLowerCase().includes(input.toLowerCase())
          )
        : []
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchTerm) getWeather(searchTerm);
  };

  return (
    <div className="container">
      <h1>{city || "Search for a place"}</h1>

      {/* Dark Mode Button below the name of the place */}
      <div className="dark-mode-button-container">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="dark-mode-button"
        >
          {isDarkMode ? <TbSun /> : <TbMoon />}{" "}
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <form onSubmit={submitHandler} className="search-bar">
        <input
          type="text"
          placeholder="Search for a city"
          value={searchTerm}
          onChange={(e) => searchCountries(e.target.value)}
        />
        <button type="submit">
          <TbSearch />
        </button>
      </form>

      {/* Autocomplete dropdown */}
      {countryMatch.length > 0 && (
        <ul className="autocomplete-dropdown">
          {countryMatch.map((country, index) => (
            <li
              key={index}
              onClick={() => {
                setSearchTerm(country);
                setCountryMatch([]);
                getWeather(country);
              }}
            >
              {country}
            </li>
          ))}
        </ul>
      )}

      {/* Weather data display */}
      {loading ? (
        <div className="loader">Loading...</div>
      ) : weatherData ? (
        <>
          <DetailsCard
            weather_icon={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@4x.png`}
            data={weatherData}
          />
          <h2>5-Day Forecast</h2>
          <ul className="summary">
            {weatherData.list.map((day, index) => (
              <SummaryCard key={index} day={day} />
            ))}
          </ul>
        </>
      ) : noData ? (
        <div className="nodata">
          <img src={Astronaut} alt="Not Found" />
          <p>{noData}</p>
        </div>
      ) : (
        <div className="nodata">
          <img src={SearchPlace} alt="Search" />
          <p>Try searching for a city like "India" or "USA".</p>
        </div>
      )}
    </div>
  );
}

export default App;