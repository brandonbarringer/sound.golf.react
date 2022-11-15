export const getUserLocation = (sucess, error) => {
  navigator.geolocation.getCurrentPosition(sucess, error);
};

// get altitude from opentopodata.org
export const getUserAltitude = async (latitude, longitude) => {
  const url = `https://api.opentopodata.org/v1/aster30m?locations=${latitude},${longitude}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results[0].elevation;
}