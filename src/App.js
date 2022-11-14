import React from "react";

// Components
import { Stat } from './components/Stats/Stat';
import { StatBox } from './components/Stats/StatBox';

// Styles
import { reset } from "./app.style";
import { injectGlobal } from "@emotion/css";

// Store
import { useStore } from './store';

// Global Styles
injectGlobal({...reset});


function App() {
  const [store, setStore] = useStore();

  const increment = (num) => {
    setStore({ path: 'stats.ballSpeed.value', payload: num });
    setStore({ path: 'weather.humidity.value', payload: num });
    setStore({ path: 'location.altitude', payload: num });

    console.log(store);
  };

  // set(stats.ballSpeed.value, 100);

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
        <button onClick={() => increment(50)}>Click</button>
        <StatBox>
          {statList}
        </StatBox>
    </div>
  );
}

export default App;
