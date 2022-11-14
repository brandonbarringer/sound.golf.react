import { TUnit } from '../Types';

export const weather = {
  humidity: new TUnit('Humidity', 0, '%'),
  pressure: new TUnit('Pressure', 0, 'hPa'),
  temperature: new TUnit('Temperature', 0, '°F'),
};