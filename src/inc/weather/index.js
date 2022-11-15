export const getUserWeather = async (latitude, longitude) => {
  const baseUrl = 'https://www.7timer.info/bin/api.pl';
  const params = {
    lon: longitude,
    lat: latitude,
    product: 'civil',
    output: 'json'
  };
  const url = `${baseUrl}?${new URLSearchParams(params)}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};