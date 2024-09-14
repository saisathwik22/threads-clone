import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // parse incoming data from req.body
app.use(express.urlencoded({ extended: true })); // to parse form data into req.body
// extended: true --> even if req.body has some nested objects it'll be able to parse it without an issue.
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
