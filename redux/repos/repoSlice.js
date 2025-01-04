import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  repos: [],
  loading: false,
  error: null,
};

const repoSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {
    fetchReposRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchReposSuccess: (state, action) => {
      state.repos = [...state.repos, ...action.payload];
      state.loading = false;
    },
    fetchReposFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchReposRequest, fetchReposSuccess, fetchReposFailure } =
  repoSlice.actions;

export default repoSlice.reducer;
