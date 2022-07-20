import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCourses, getCourses } from "../store/courses";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";

function CoursesPage() {
  const dispatch = useDispatch();
  const courses = useSelector(getCourses);

  useEffect(() => {
    dispatch(loadCourses());
    console.log("useEffect called");
  }, []);

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList courses={courses} />
    </>
  );
}

export default CoursesPage;
