import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let courses;

export default class CoursesDAO {
  static async injectDB(conn) {
    if (courses) {
      return;
    }
    try {
      courses = await conn
        .db(process.env.COURSEREVIEWS_NS)
        .collection("restaurants");
    } catch (e) {
      console.error(
        "Unable to establish a connection handle in coursesDAO: " + e
      );
    }
  }

  static async getCourses({
    filters = null,
    page = 0,
    coursesPerPage = 20,
  } = {}) {
    let query;
    // these are specific to querying in mongoDB
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("cuisine" in filters) {
        query = { cuisine: { $eq: filters["cuisine"] } };
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } };
      }
    }
    let cursor;

    try {
      cursor = await courses.find(query);
    } catch (e) {
      console.error("Unable to issue find command, " + e);
      return { coursesList: [], totalNumCourses: 0 };
    }

    const displayCursor = cursor
      // how many restaurants to return
      .limit(coursesPerPage)
      // this is how many to skip past
      // if looking for third page of results and every page has 20 items
      // then must skip 2 * 20 pages (page starts at zero)
      .skip(coursesPerPage * page);

    try {
      const coursesList = await displayCursor.toArray();
      const totalNumCourses = await courses.countDocuments(query);

      return { coursesList, totalNumCourses };
    } catch (e) {
      console.error(
        "Unable to convert cursor to array or problem counting documents"
      );
      return { coursesList: [], totalNumCourses: 0 };
    }
  }
}
