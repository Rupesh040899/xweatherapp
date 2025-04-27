import "./app.css";
import { useEffect, useState } from "react";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
  const [searchCity, setSearchCity] = useState("");
  const handleSearch = () => {
    onSearch(searchCity);
  };
  return (
    <div>
      <input
        type="text"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
        style={{ borderBlockColor: "blue" }}
      />
      <button onClick={handleSearch} style={{ backgroundColor: "lightgreen" }}>
        Search
      </button>
    </div>
  );
};

const WeatherCard = ({ title, data }) => {
  return (
    <div id="uni">
      <h3>{title}</h3>
      <p>{data}</p>
    </div>
  );
};
const WeatherDisplay = ({ city }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (city) {
      setLoading(true);
      axios
        .get(`https://api.weatherapi.com/v1/current.json`, {
          params: {
            key: "4a6e3859c8c34043ae9155839252704",
            q: city,
          },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          alert("Failed to fetch weather data");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [city]);

  return (
    <div>
      {loading && <p>Loading data..</p>}
      {!loading && data && (
        <div>
          <WeatherCard title="Temprature" data={`${data.current.temp_c}°C`} />
          <WeatherCard title="Humidity" data={`${data.current.humidity}%`} />
          <WeatherCard title="Condition" data={data.current.condition.text} />
          <WeatherCard
            title="Wind Speed"
            data={`${data.current.wind_kph}kph`}
          />
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [city, setCity] = useState("");
  const handleChange = (searchCity) => {
    setCity(searchCity);
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleChange} />
      <WeatherDisplay city={city} />
    </div>
  );
}
