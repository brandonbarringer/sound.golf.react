import React, {
  useEffect
} from "react";

// Components
import { Stat } from './components/Stats/Stat';
import { StatBox } from './components/Stats/StatBox';

// Styles
import { reset } from "./app.style";
import { injectGlobal } from "@emotion/css";

// Store
import { useStore } from './store';

// includes
import { 
  getUserLocation, 
  getUserAltitude 
} from './inc/location';

import { getUserWeather } from './inc/weather';
import { celciusToFahrenheit, stringPercentToNumber, speedOfSound as calcSound } from './inc/calc';

// Global Styles
injectGlobal({...reset});


function App() {
  const [store, setStore] = useStore();
  const [speedOfSound, setSpeedOfSound] = React.useState(0);

  useEffect(() => {
    const sucess = async (position) => {
      const { latitude, longitude } = position.coords;
      let { altitude } = position.coords;
      if (!altitude) {
        altitude = await getUserAltitude(latitude, longitude);
      }
      setStore({ path: 'location.latitude.value', payload: latitude });
      setStore({ path: 'location.longitude.value', payload: longitude });
      setStore({ path: 'location.altitude.value', payload: altitude });
    };

    const error = (error) => {
      console.log(error);
    };

    getUserLocation(sucess, error);
  }, []);

  useEffect(() => {
    const { latitude, longitude } = store.location;
    if (!latitude.value || !longitude.value) return;
    const getWeather = async () => {
      const data = await getUserWeather(latitude.value, longitude.value);
      const { rh2m, temp2m } = data.dataseries[0];
      setStore({ 
        path: 'weather.humidity.value', 
        payload: stringPercentToNumber(rh2m)
      });
      setStore({
        path: 'weather.temperature.value',
        payload: celciusToFahrenheit(temp2m)
      });
    };
    getWeather();
  }, [store.location]);

  useEffect(() => {
    const { humidity, temperature } = store.weather;
    if (!humidity.value || !temperature.value) return;
    const speed = calcSound(temperature.value, humidity.value);
    setSpeedOfSound(speed);
    console.log(store);
  }, [store.weather]);


  const statList = Object.keys(store.stats).map((stat) => (
    <Stat
      key={store.stats[stat].name}
      value={store.stats[stat].value}
      unit={store.stats[stat].unit}
      label={store.stats[stat].name}
    />
  ));

  const locationList = Object.keys(store.location).map((location) => (
    <Stat
      key={store.location[location].name}
      value={store.location[location].value}
      unit={store.location[location].unit}
      label={store.location[location].name}
    />
  ));

  const weatherList = Object.keys(store.weather).map((weather) => (
    <Stat
      key={store.weather[weather].name}
      value={store.weather[weather].value}
      unit={store.weather[weather].unit}
      label={store.weather[weather].name}
    />
  ));


  return (
    <div className="App">
        <StatBox>
          {statList}
        </StatBox>
        <br/>
        <br/>
        <StatBox>
        {locationList}
        {weatherList}
        <Stat
          value={speedOfSound}
          unit={'m/s'}
          label={'Speed of Sound'}
        />
      </StatBox>
    </div>
  );
}

export default App;
