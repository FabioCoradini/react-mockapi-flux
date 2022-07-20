import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "courses",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    coursesRequested: (bugs, action) => {
      bugs.loading = true;
    },

    coursesReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
    },

    coursesRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },
  },
});

export const { coursesRequested, coursesReceived, coursesRequestFailed } =
  slice.actions;

export default slice.reducer;

// Action Creators
const url = "/courses";

export const loadCourses = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url,
      onStart: coursesRequested.type,
      onSuccess: coursesReceived.type,
      onError: coursesRequestFailed.type,
    })
  );
};

// Selectors
export const getCourses = createSelector(
  (state) => state.entities.courses,
  (courses) => courses.list
);

export const getCourseById = createSelector(
  (state) => state.entities.courses,
  (courses, id) => courses.list.filter((c) => c.id === id)
);
