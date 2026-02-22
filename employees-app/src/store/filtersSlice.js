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

const initialFilters = getInitialFilters();

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    draft: initialFilters,
    applied: initialFilters,
  },
  reducers: {
    updateFilterArray: (state, action) => {
      const { filterName, value } = action.payload;
      const index = state.draft[filterName].indexOf(value);
      if (index === -1) state.draft[filterName].push(value);
      else state.draft[filterName].splice(index, 1);
    },
    removeFilterItem: (state, action) => {
      const { filterName, value } = action.payload;
      state.draft[filterName] = state.draft[filterName].filter(item => item !== value);
    },
    setNameSearch: (state, action) => {
      state.draft.Name = action.payload;
    },
    applyFilters: (state) => {
      state.applied = { ...state.draft };
    },
  },
});

export const { updateFilterArray, removeFilterItem, setNameSearch, applyFilters } = filtersSlice.actions;
export default filtersSlice.reducer;