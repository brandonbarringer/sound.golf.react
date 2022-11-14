import { useReducer } from 'react';

import { stats } from './stats';
import { weather } from './weather';
import { location } from './location';

const initialState = {
  stats,
  weather,
  location
};

const recreateObject = (object, path, value) => {
  const pathArray = path.split('.');
  const lastKey = pathArray.pop();
  const lastObj = pathArray.reduce((obj, key) => obj[key] = obj[key] || {}, object);
  lastObj[lastKey] = value;
  return object;
}

const reducer = (state, action) => {
  return {
    ...state,
    ...recreateObject(state, action.path, action.payload)
  };
};

const useStore = () => {
  const [store, setStore] = useReducer(reducer, initialState);
  return [store, setStore];
};


export {
  useStore
}