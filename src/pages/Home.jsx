import { useState } from "react";
import LocationsModal from "../components/LocationsModal";

const Home = () => {
  const [click, setClick] = useState(false);
  console.log(click);
  return (
    <div className="">
      <div className="text-center">
        <h1 className="text-6xl text-blue-300 font-extrabold">
          Weather <span className="text-blue-500">App</span>
        </h1>
        <p className="py-4 text-md text-gray-400">Check today's Weather</p>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setClick("Clicked")}
          className="text-lg font-medium hover:scale-105 transition-all delay-500 bg-blue-600 px-5 py-1 rounded-4xl text-gray-100"
        >
          Check Weather
        </button>
      </div>
      {click && <LocationsModal onClose={() => setClick(false)} />}
    </div>
  );
};

export default Home;
