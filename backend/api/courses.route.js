import express from "express";
import CoursesCtrl from "./courses.controller.js"
import ReviewsCtrl from "./reviews.controller.js"
const router = express.Router();

// get something returned at / from the restaurants controller that gives back the courses
router.route("/").get(CoursesCtrl.apiGetCourses);

router
    .route("/review")
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)

// post --> create a new review
// put --> edit a new review
// delete --> delete a review
export default router;