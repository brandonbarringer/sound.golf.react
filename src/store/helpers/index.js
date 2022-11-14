export const reduce = (state, action, setters) => {
  if (setters[action.path]) {
    return setters[action.path](state, action);
  }

  return state;
};

const recreateObject = (object, path, value) => {
  const pathArray = path.split('.');
  const lastKey = pathArray.pop();
  const lastObj = pathArray.reduce((obj, key) => obj[key] = obj[key] || {}, object);
  lastObj[lastKey] = value;
  return object;
}

export const set = (path, state, action) => {
  return {
    ...state,
    ...recreateObject(state, path, action.payload)
  };
};