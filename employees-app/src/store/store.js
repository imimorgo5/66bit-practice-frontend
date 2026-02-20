import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './employeesSlice';
import filtersReducer from './filtersSlice';

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    filters: filtersReducer,
  },
});