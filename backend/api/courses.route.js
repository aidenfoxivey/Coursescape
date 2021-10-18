import express from "express";
import CoursesController from "./courses.controller.js"
import ReviewsController from "./reviews.controller.js"
const router = express.Router();

// get something returned at / from the restaurants controller that gives back the courses
router.route("/").get(CoursesController.apiGetCourses);

router
    .route("/review")
    .post(ReviewsController.apiPostReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview)

// post --> create a new review
// put --> edit a new review
// delete --> delete a review
export default router;