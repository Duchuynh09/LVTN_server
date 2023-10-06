import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import env from "dotenv";
import cookieParser from "cookie-parser";
import {
  adminRouter,
  sponsorRouter,
  userRouter,
  postsRouter,
  sendMailRouter,
  devicesRouter,
  productRouter,
  readFileRouter,
} from "./index.js";
env.config();

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.URI_BASE;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public/images"));

app.use("/dssv", productRouter);
app.use("/sendMail", sendMailRouter);
app.use("/user", userRouter);
app.use("/posts", postsRouter);
app.use("/device", devicesRouter);
app.use("/sponsor", sponsorRouter);

app.use("/admins", adminRouter);

// KẾT NỐI DATABASE
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`SERVER RUN ON ${PORT}`);
    });
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
