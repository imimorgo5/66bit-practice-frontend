import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Name: '',
  Gender: [],
  Position: [],
  Stack: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateFilterArray: (state, action) => {
      const { filterName, value } = action.payload;
      const currentValues = state[filterName];
      if (currentValues.includes(value)) {
        state[filterName] = currentValues.filter(item => item !== value);
      } else {
        state[filterName] = [...currentValues, value];
      }
    },
    setNameSearch: (state, action) => {
      state.Name = action.payload;
    },
    removeFilterItem: (state, action) => {
      const { filterName, value } = action.payload;
      state[filterName] = state[filterName].filter(item => item !== value);
    },
    resetFilters: () => initialState,
  },
});

export const { setFilters, updateFilterArray, setNameSearch, removeFilterItem, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;