import React from "react";
import { useState } from "react";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";

const CountryPage = ({ countries, name }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState(0);
  const c = countries.filter((c) => c.name.includes(name));
  const uri =
    "http://api.weatherstack.com/current?access_key=" +
    api_key +
    "&query=" +
    c[0].name;
  console.log(weather);
  console.log(weather.current);

  useEffect(() => {
    axios.get(uri).then((response) => {
      setWeather(response.data);
    });
  }, []);

  return (
    <div>
      <h1>{c[0].name}</h1>
      <p>capital {c[0].capital}</p>
      <p>population {c[0].population}</p>
      <h2>Languages</h2>
      <ul>
        {c[0].languages.map((language, i) => (
          <li key={i}>{language.name}</li>
        ))}
      </ul>

      <img src={c[0].flag} alt="flag" width="130" height="100" />
      <h2>Weather in {c[0].capital}</h2>
      {weather.current && (
        <div>
          <p>
            <b>temperature: </b> {weather.current.temperature} Celsius
          </p>
          <img
            src={weather.current.weather_icons[0]}
            alt="weatherSymbol"
            width="50"
            height="50"
          />
          <p>
            <b>wind: </b>
            {weather.current.wind_speed} mph direction{" "}
            {weather.current.wind_dir}
          </p>
        </div>
      )}
    </div>
  );
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState(0);
  const [showCountryPage, setShowCountryPage] = useState(false);

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  const handleNameSearch = (event) => {
    setSearchInput(event.target.value);
    setShowCountryPage(false);
  };
  const countriesToShow = countries.filter((p) =>
    p.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
  );

  const handleClick = (name) => {
    setShowCountryPage(true);
    setCountryName(name);
  };

  if (
    countriesToShow.length <= 10 &&
    countriesToShow.length !== 1 &&
    !showCountryPage
  ) {
    return (
      <div>
        search countries
        <input value={searchInput} onChange={handleNameSearch} />
        {countriesToShow.map((country, i) => (
          <div key={i}>
            {country.name}{" "}
            <button
              key={country.name}
              onClick={() => {
                handleClick(country.name);
              }}
            >
              show
            </button>
          </div>
        ))}
      </div>
    );
  }
  if (countriesToShow.length >= 10 && !showCountryPage) {
    return (
      <div>
        search countries
        <input value={searchInput} onChange={handleNameSearch} />
        <p>too many matches, please specify</p>
      </div>
    );
  }
  if (countriesToShow.length === 1) {
    return (
      <div>
        search countries
        <input value={searchInput} onChange={handleNameSearch} />
        <CountryPage countries={countries} name={countriesToShow[0].name} />
      </div>
    );
  }
  return (
    <div>
      search countries
      <input value={searchInput} onChange={handleNameSearch} />
      <CountryPage countries={countries} name={countryName} />
    </div>
  );
}
export default App;
