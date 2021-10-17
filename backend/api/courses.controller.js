import CoursesDAO from "../dao/coursesDAO.js";

export default class CoursesController {
  static async apiGetCourses(req, res, next) {
    const coursesPerPage = req.query.coursesPerPage
      ? parseInt(req.query.coursesPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    // if we find the query string of any kind in the query string, then filter for that
    let filters = {};
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine;
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }

    const { coursesList, totalNumCourses } = await CoursesDAO.getCourses({
      filters,
      page,
      coursesPerPage,
    });

    let response = {
      courses: coursesList,
      page: page,
      filters: filters,
      entries_per_page: coursesPerPage,
      total_results: totalNumCourses,
    };
    // can now read out the
    res.json(response);
  }
}
