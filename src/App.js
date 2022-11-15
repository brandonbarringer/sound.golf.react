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
import { celciusToFahrenheit, stringPercentToNumber } from './inc/calc';

// Global Styles
injectGlobal({...reset});


function App() {
  const [store, setStore] = useStore();

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

  const statList = Object.keys(store.stats).map((stat) => (
    <Stat
      key={store.stats[stat].name}
      value={store.stats[stat].value}
      unit={store.stats[stat].unit}
      label={store.stats[stat].name}
    />
  ));

  return (
    <div className="App">
        <StatBox>
          {statList}
        </StatBox>
    </div>
  );
}

export default App;
