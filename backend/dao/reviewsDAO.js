import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn
        .db(process.env.COURSEREVIEWS_NS)
        .collection("reviews");
    } catch (e) {
      console.error("unable to establish connection handles in userDAO:" + e);
    }
  }

  static async addReview(courseId, userInfo, review, date) {
    try {
      const courseID = ObjectId(courseId);
      const reviewDoc = {
        name: userInfo.name,
        user_id: userInfo._id,
        date: date,
        text: review,
        _id: ObjectId(courseId),
      };

      console.log(reviewDoc)
      console.log(courseID)
      console.log(ObjectId(courseId))
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error("unable to post review: " + e);
      return { error: e };
    }
  }

  static async updateReview(reviewId, userId, text, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: userId, _id: ObjectId(reviewId) },
        { $set: { text: text, date: date } }
      );

      return updateResponse;
    } catch (e) {
      console.error("Unable to update review: " + e);
      return { error: e };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
        user_id: userId,
      });

      return deleteResponse;
    } catch (e) {
      console.error("Unable to delete review: " + e);
      return { error: e };
    }
  }
}
