export const celciusToFahrenheit = (c) => {
  return (c * 9/5) + 32;
}

export const fahrenheitToCelcius = (f) => {
  return (f - 32) * 5/9;
}

export const stringPercentToNumber = (string) => {
  return parseFloat(string) / 100;
}