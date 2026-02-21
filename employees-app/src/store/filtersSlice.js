import { createSlice } from '@reduxjs/toolkit';

const getInitialFilters = () => {
  const params = new URLSearchParams(window.location.search);
  const local = JSON.parse(localStorage.getItem('filters')) || {};

  const getArrayParam = (key) => {
    const urlVal = params.get(key);
    if (urlVal) return urlVal.split(',');
    return local[key] || [];
  };

  return {
    Name: params.get('Name') || local.Name || '',
    Position: getArrayParam('Position'),
    Gender: getArrayParam('Gender'),
    Stack: getArrayParam('Stack'),
  };
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: getInitialFilters(),
  reducers: {
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateFilterArray: (state, action) => {
      const { filterName, value } = action.payload;
      const index = state[filterName].indexOf(value);
      if (index === -1) state[filterName].push(value);
      else state[filterName].splice(index, 1);
    },
    removeFilterItem: (state, action) => {
      const { filterName, value } = action.payload;
      state[filterName] = state[filterName].filter(item => item !== value);
    },
    setNameSearch: (state, action) => {
      state.Name = action.payload;
    },
  },
});

export const { setFilters, updateFilterArray, removeFilterItem, setNameSearch } = filtersSlice.actions;
export default filtersSlice.reducer;