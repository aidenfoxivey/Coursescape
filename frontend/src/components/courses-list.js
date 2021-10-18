import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CourseDataService from "../services/course";

const CoursesList = props => {
  const [courses, setCourses] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveCourses();
  }, []);

}

export default CoursesList;
