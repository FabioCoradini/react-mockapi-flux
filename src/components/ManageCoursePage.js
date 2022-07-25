import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CourseForm from "./CourseForm";

import { toast } from "react-toastify";
import { getCourseBySlug, saveCourse } from "../store/courses";

const ManageCoursePage = (props) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const courseFromStore = useSelector((state) =>
    getCourseBySlug(state, props.match.params.slug)
  );
  const [course, setCourse] = useState(
    courseFromStore || {
      title: "",
      slug: "",
      authorId: 0,
      category: "",
    }
  );

  function handleChange({ target }) {
    setCourse({ ...course, [target.name]: target.value });
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author ID is required";
    if (!course.category) _errors.category = "Category is required";

    setErrors(_errors);
    // Form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    // update slug
    course.slug = course.title.toLowerCase().trim().replace(" ", "-");

    dispatch(saveCourse(course))
      .then(() => {
        props.history.push("/courses");
        toast.success("Course saved.");
      })
      .catch((err) => alert(err));
  }

  return (
    <>
      <h2>Manage Course</h2>

      <CourseForm
        errors={errors}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
