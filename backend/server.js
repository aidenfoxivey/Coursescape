// configure express.js server
// attach cors and express.json middleware

import express from "express";
import cors from "cors";
// import file to provide routes to access course data
import courses from "./api/courses.route.js";

const app = express();

app.use(cors());
app.use(express.json());
// get or post requests can be read by including express.json

// goes to URL as first arg and second arg is the routes
app.use("/api/v1/courses", courses);
// for nonexistent routes

app.use("*", (req, res) => res.status(404).json({ error: "not found" }));
// export this file as a module
// import this file in the file that accesses the database
// database -- the one you run to get the server running
export default app;
