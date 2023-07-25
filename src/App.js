import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { FiMoon, FiSun } from "react-icons/fi";
import { HiOutlineCloud } from "react-icons/hi";
import { BsDropletHalf } from "react-icons/bs";
import { FaWind } from "react-icons/fa";
import { IoIosCloudUpload } from "react-icons/io";

function App() {
  const apiKey = `${process.env.REACT_APP_API_KEY}`;
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});

  const getWetherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .then((data) => {
        console.log(data.weather.icon);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const handleChangeInput = (e) => {
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWetherDetails(inputCity);
  };
  return (
    <>
      <div className="">
        <a
          href="#"
          className="text-2xl flex items-center gap-2 absolute top-2 left-2 font-semibold"
        >
          <HiOutlineCloud /> react-app
        </a>
        <div className="p-5 lg:p-10">
          <div className="h-64 flex flex-col items-center justify-center ">
            <div className="text-black grid gap-5">
              <input
                type="text"
                className="bg-transparent outline-none border-b-2 w-96 h-12 pl-2 pr-2  capitalize"
                placeholder="Enter Your City"
                value={inputCity}
                onChange={handleChangeInput}
              />
              <button className="bn3" type="" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
          {Object.keys(data).length > 0 && (
            <div className=" text-center" role="status">
              <div className="grid place-content-center">
                <img
                  className="object-contain mb-5"
                  src={`http://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
                />
              </div>
              <div className="grid items-center">
                <div className="grid items-center justify-center gap-2">
                  <h5 className="text-5xl">
                    {data?.name},<span> {data?.sys?.country}</span>
                  </h5>
                  <h2 className="text-2xl capitalize">
                    {data?.weather[0]?.description}
                  </h2>
                </div>
                <div className="flex border-b-2 gap-10 justify-center items-center text-xl">
                  <h6 className="text-6xl gap-2 mb-5 lg:grid">
                    {~~(data?.main?.temp - 273.15).toFixed(2)}°C
                    <span className="block text-lg text-left">
                      Feel Like {~~(data?.main?.temp - 273.15).toFixed(2) - 1}
                      °C
                    </span>
                  </h6>
                  <div>
                    <h3 className="grid gap-2 ">
                      <div className="flex gap-3">
                        <BsDropletHalf size={30} />
                        {data?.main?.humidity}%
                      </div>{" "}
                      humidity
                    </h3>
                  </div>
                  <div>
                    <h3 className="grid gap-2">
                      <div className="flex gap-3">
                        <FaWind size={30} />
                        {data?.wind?.speed}
                      </div>
                      Wind Speed
                    </h3>
                  </div>
                  <div>
                    <h3 className="grid gap-2">
                      <div className="flex gap-3">
                        <IoIosCloudUpload size={30} />
                        {data?.main?.pressure}
                      </div>
                      Pressure
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
