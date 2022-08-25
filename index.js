import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import productRouter from "./routers/dssvRoutes.js";
import mongoose from "mongoose";
import fs from "fs";
import { Buffer } from "buffer";

const app = express();
const PORT = process.env.PORT || 5000;
const URI =
  "mongodb+srv://admin:WU8NlSUsgXUyK3Tx@cluster0.42rmswo.mongodb.net/?retryWrites=true&w=majority";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/dssv", productRouter);

var buf = new Buffer(1024 * 17);
const dssv = [];

fs.open("dssv.txt", "r+", function (err, fd) {
  if (err) {
    return console.error(err);
  }
  console.log("File duoc mo thanh cong!");
  fs.read(fd, buf, 0, 1024 * 17, 0, function (err, bytes) {
    if (err) {
      console.log(err);
    }
    // In so luong byte da doc.

    if (bytes > 0) {
      let data = buf.toString().split("\r\n");
      let newsv = {};
      data.forEach((item) => {
        newsv = {
          mssv: item.slice(
            item.indexOf("08/08/2022") + 11,
            item.indexOf("08/08/2022") + 19
          ),
          maDonVi: item.slice(item.indexOf(" ") + 1, item.indexOf(" ") + 3),
        };
        dssv.push(newsv);
      });
   
    }
  });
});

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log("SERVER RUN");
    });
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

export { dssv };
