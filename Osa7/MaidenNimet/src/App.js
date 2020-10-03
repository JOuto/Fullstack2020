import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const initialRender = useRef(true);

  useEffect(() => {
    setNotFound(false);
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      axios
        .get("https://restcountries.eu/rest/v2/name/" + name + "?fullText=true")
        .then((response) => {
          setCountry(response.data);
        })
        .catch((error) => {
          console.log(error.response);
          setNotFound(true);
        });
    }
  }, [name]);
  console.log(notFound);

  if (notFound === true) {
    return {
      found: false,
    };
  }
  if (notFound === false && country) {
    return {
      found: true,
      data: {
        name: country[0].name,
        capital: country[0].capital,
        population: country[0].population,
        flag: country[0].flag,
      },
    };
  }

  return null;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  console.log(country);
  if (!country.found) {
    return <div>not found...</div>;
  }
  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();

    setName(nameInput.value);
  };
  console.log(name);
  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
