// connect to databse
// start server

import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import CoursesDAO from "./dao/coursesDAO.js";

// load in the env vars
dotenv.config();

const MongoClient = mongodb.MongoClient;
// 8000 if can't be accessed
const port = process.env.PORT || 8000;

MongoClient.connect(process.env.COURSEREVIEWS_DB_URI, {
  wtimeoutMS: 2500,
  maxPoolSize: 50,
  useNewUrlParser: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await CoursesDAO.injectDB(client);
    // how we start the webserver
    // after started
    app.listen(port, () => {
      console.log("listening on port " + port);
    });
  });
