import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "courses",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
});

export default slice.reducer;

// Action Creators
// ...

// Selectors
// ...
