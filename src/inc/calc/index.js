export const celciusToFahrenheit = (c) => {
  return (c * 9/5) + 32;
}

export const fahrenheitToCelcius = (f) => {
  return (f - 32) * 5/9;
}

export const stringPercentToNumber = (string) => {
  return parseFloat(string) / 100;
}

export const speedOfSound = (temperature, humidity) => {
  const c = temperature; // fahrenheit
  const h = humidity; // float
  const t = fahrenheitToCelcius(c); // celcius
  const a = 331.3 * Math.sqrt(1 + (t / 273.15));
  const b = 0.6 * h * a;
  return a + b;
}