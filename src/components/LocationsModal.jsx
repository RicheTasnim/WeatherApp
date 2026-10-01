import { X } from "lucide-react";
import { useState } from "react";
import { getGeolocation } from "../services/get-geolocation";
import { useNavigate } from "react-router-dom";

const LocationsModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const goToPage = (location) => {
    navigate("/weather", { state: { location } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = city.trim();
    // console.log(value);
    if (!value) {
      setError("Enter a valid city name!");
    }
    try {
      const location = await getGeolocation(value);
      //
      if (!location) {
        setError("Geocoding request failed!");
      }
      goToPage(location);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGeoLocations = () => {
    if (!navigator.geolocation) {
      setError("Geo location not found!");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (positions) => {
        const { latitude, longitude } = positions.coords;
        // console.log({ latitude, longitude });
        goToPage({ name: "Your Location", lat: latitude, lon: longitude });
      },
      (error) => {
        setError(error.message);
      },
      {
        timeout: 10000,
      },
    );
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-950/60">
      <div className="h-[300px] w-[400px] p-5 bg-gray-100 shadow-2xl rounded-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Where are you today?</h2>
          <button onClick={onClose} className="cursor-pointer">
            <X />
          </button>
        </div>
        <div className="pt-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              placeholder="Enter city name"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border p-1 rounded-2xl"
            />

            <div className="">
              <button
                type="submit"
                className="text-lg w-full font-medium hover:scale-105 transition-all delay-500 bg-blue-600 px-5 py-1 rounded-4xl text-gray-100"
              >
                Get Weather
              </button>
            </div>
          </form>
        </div>
        <div className="p-2 text-center">Or</div>
        <div className="">
          <button
            type="button"
            onClick={handleGeoLocations}
            className="text-lg font-medium w-full hover:scale-105 transition-all delay-500 bg-blue-600 px-5 py-1 rounded-4xl text-gray-100"
          >
            Use My Location
          </button>
        </div>
        <div className="text-center">
          {error && <p className="text-red-600 text-md font-medium">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LocationsModal;
