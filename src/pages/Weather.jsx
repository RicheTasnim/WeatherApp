import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import Loader from "../components/Loader";
import LocationModal from "../components/LocationModal";
import RecommandationCard from "../components/RecommandationCard";
import WeatherCard from "../components/WeatherCard";
import WeatherType from "../components/WeatherType";
import { getWeather } from "../services/get-weather";
import { getRecommandations } from "../utils/getRecommandation";

const Weather = () => {
  const value = useLocation();
  const place = value?.state?.location;
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!place) {
      return;
    }
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const result = await getWeather(place);
        setWeather(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setOpen(false);
      }
    };
    fetchWeather();
  }, [place]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <header className="py-4">
        {!loading && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Top row on mobile / Left side on desktop: Back Button & Title */}
            <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-3">
              <Link
                to={"/"}
                className="flex items-center justify-center border border-2 border-gray-300 dark:border-gray-600 rounded-full p-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex-shrink-0"
                title="Back to Home"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </Link>

              <h1 className="text-xl text-blue-300 font-bold">
                Weather <span className="text-blue-400">App</span>
              </h1>

              {/* Hidden spacer on mobile to keep title centered if desired, or let justify-between handle it */}
              <div className="w-8 sm:hidden"></div>
            </div>

            {/* Bottom on mobile / Right side on desktop: Change Location Button */}
            <div className="w-full sm:w-auto flex justify-center sm:justify-end">
              <button
                onClick={() => setOpen(true)}
                className="text-base sm:text-lg font-medium hover:scale-105 transition-all bg-blue-500 px-5 cursor-pointer py-1.5 rounded-full text-gray-100 w-full sm:w-auto text-center"
                type="button"
              >
                Change location
              </button>
            </div>
            
          </div>
        )}
      </header>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
          <div className="space-y-3 w-full">
            {/* Weather Card */}
            <WeatherCard place={place} weather={weather} />
            {/* Weather Recommendation */}
            <RecommandationCard recommendation={getRecommandations(weather)} />
          </div>
          {/* Weather Type */}
          <div className="w-full">
            <WeatherType place={place} weather={weather} />
          </div>
        </div>
      )}

      {open && <LocationModal onClose={() => setOpen(false)} />}
    </div>
  );
};

export default Weather;