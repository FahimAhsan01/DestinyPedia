import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import gearRouter from "./routes/gear.js";

const app = express();


app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter); // http://localhost:5000/users/signup
app.use("/gear", gearRouter);
app.get("/", (req, res) => {
  res.send("Welcome to gear API");
});

const MONGODB_URL="mongodb+srv://fahimahsan01:DestinyPedia@cluster0.xs0uecv.mongodb.net/DestinyPedia?retryWrites=true&w=majority";
const port = 5000;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
