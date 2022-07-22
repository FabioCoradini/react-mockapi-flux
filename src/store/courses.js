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

export const getCourseBySlug = (state) => (slug) => {
  console.log("getCourseBySlug");
  console.log("state", state);
  console.log("slug", slug);
  return state.entities.courses.list.filter((c) => c.slug === slug)[0];
};

// export const getCourseBySlug = createSelector(
//   (state) => state.entities.courses,
//   (courses, slug) => courses.list.filter((c) => c.slug === slug)
// );
