import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEmployeesRequest, fetchEmployeeByIdRequest } from '../api/apiClient';

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (params, { rejectWithValue }) => {
    try {
      const data = await fetchEmployeesRequest(params);
      return { data, page: params.Page };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEmployeeById = createAsyncThunk(
  'employees/fetchEmployeeById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchEmployeeByIdRequest(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  list: [],
  currentEmployee: null,
  status: 'idle',
  profileStatus: 'idle',
  error: null,
  profileError: null,
  hasMore: true,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    resetEmployeesList: (state) => {
      state.list = [];
      state.hasMore = true;
      state.status = 'idle';
      state.error = null;
    },
    clearCurrentEmployee: (state) => {
      state.currentEmployee = null;
      state.profileStatus = 'idle';
      state.profileError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload.page === 1) {
          state.list = action.payload.data;
        } else {
          state.list = [...state.list, ...action.payload.data];
        }
        if (action.payload.data.length === 0) {
          state.hasMore = false;
        }
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchEmployeeById.pending, (state) => {
        state.profileStatus = 'loading';
        state.profileError = null;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.profileStatus = 'succeeded';
        state.currentEmployee = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.profileStatus = 'failed';
        state.profileError = action.payload;
      });
  },
});

export const { resetEmployeesList, clearCurrentEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;