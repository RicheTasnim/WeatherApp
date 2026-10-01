export const getGeolocation = async (city) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`;
  const result = await fetch(url);
  //   console.log(await result.json());
  if (!result) {
    throw new Error("Geocoding request failed!");
  }
  const data = await result.json();
  const place = data.results[0];
  //   console.log(place);

  return {
    name: place.name,
    lat: place.latitude,
    lon: place.longitude,
  };
};
