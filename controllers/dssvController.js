import fs from "fs";
import { Buffer } from "buffer";

import { eventModel } from "../models/event.js";
import { pendingEventModel } from "../models/pendingEvent.js";
import { users } from "../models/user.js";
import { sendMail } from "./sendMailController.js";
import { admins } from "../models/admins.js";
import { readFilePDF } from "../service/handleFilePDF.js";
// import { openDssv } from "../service/handleFileTxt.js";

const getDssvCoTheDangKy = async (req, res) => {
  try {
    const idReq = req.params.id;

    if (idReq === "null" || idReq === "undefined")
      return res.status(204).json({ message: "failure" });

    const ds = await eventModel.findById(idReq);
    return res.status(200).json({ name: ds.name, data: ds.dsCoTheDangKy });
  } catch (error) {
    return res.status(500);
  }
};

const getDssvDaDangKy = async (req, res) => {
  try {
    const idReq = req.params.id;
    if (idReq === "null" || idReq === "undefined")
      return res.status(200).json({ name: "null", data: [] });
    const ds = await eventModel.findById(idReq);

    return res.status(200).json({
      name: ds.name,
      data: ds.dsDaDangKy,
      specialSeat: ds.specialSeat,
    });
  } catch (error) {
    return res.status(500);
  }
};

const getEvents = async (req, res) => {
  try {
    const ds = await eventModel.find();

    return res.status(200).json({ data: ds });
  } catch (error) {
    return res.status(500);
  }
};

const getEventById = async (req, res) => {
  const idReq = req.params.id;
  // if(idReq === 'null') return res.status(204).json({ message:'failure' });
  try {
    const ds = await eventModel.findById(idReq);
    // console.log(ds);
    if (!ds) return res.status(400).json({ state: "failure" });

    return res.status(200).json({ state: "success", data: ds });
  } catch (error) {
    return res.status(400).json({ state: "failure" });
  }
};

const getPendingEvents = async (req, res) => {
  try {
    const ds = await pendingEventModel.find();

    return res.status(200).json({ data: ds });
  } catch (error) {
    return res.status(500);
  }
};

const createEvent = async (req, res) => {
  try {
    const idReq = req.params.id;
    // if(idReq === 'null') return res.status(204).json({ message:'failure' });
    // lấy id cua event da duoc duyệt
    const event = await pendingEventModel.findById(idReq);
    const user = await users.findOne({ email: event.author });
    const admin = await admins.findOne({ email: event.author });

    if (user) {
      await users.findOneAndUpdate(
        { email: event.author },
        {
          eventsMake: [
            ...user.eventsMake,
            {
              name: event.name || "",
              limit: event.limit || "",
              date: event.date || "",
              time: event.time || "",
            },
          ],
        }
      );
    } else if (!user && admin) {
      await admins.findOneAndUpdate(
        { email: event.author },
        {
          eventsMake: [
            ...admin.eventsMake,
            {
              name: event.name || "",
              limit: event.limit || "",
              date: event.date || "",
              time: event.time || "",
            },
          ],
        }
      );
    } else {
      return res.status(400).json({ state: "failure" });
    }

    // tạo event
    const evt = new eventModel({
      name: event.name,
      dsCoTheDangKy: event.dsCoTheDangKy,
      dsDaDangKy: event.dsDaDangKy,
      author: event.author,
      limit: event.limit,
      date: event.date,
      time: event.time,
      specialSeat: event.specialSeat,
    });
    await evt.save(); // luu event vua tao

    await pendingEventModel.findByIdAndDelete(idReq); // xóa event pending trong ds pendingEvent
    return res.status(200).json({ state: "success" });
  } catch (error) {
    return res.status(500).json({ state: "failure" });
  }
};

const createPendingEvent = async (req, res) => {
  try {
    const { name, author, limit, date, time, specialSeat } = req.body;

    const data = {
      name: name,
      dsCoTheDangKy: "all",
      dsDaDangKy: [],
      author: author,
      limit: limit,
      date: date,
      time: time,
      specialSeat: specialSeat,
    };
    if (limit !== "all") {
      data.dsCoTheDangKy = []; // code them phan get du lieu de vao mang
    }
    const ds = new pendingEventModel(data);
    await ds.save();
    return res.status(200).json({ state: "success" });
  } catch (error) {
    return res.status(500).json({ state: "failure" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const idReq = req.params.id;
    const ds = await eventModel.findByIdAndDelete(idReq);
    // console.log(ds);

    // xóa sự kiện này trong mục tham gia của các user
    ds?.dsDaDangKy.forEach(async (item) => {
      const user = await users.findOne({ email: item.email });

      const arrUpdate = user.eventsJoin.filter((evt) => {
        return evt.email !== user.email;
      });

      await users.findByIdAndUpdate(
        { email: item.email },
        {
          eventsJoin: arrUpdate,
        }
      );
    });

    // xóa event này khỏi mục sự kiện đã tạo của user
    const author = await users.findOne({ email: ds.author });
    const arrUpdate2 = author.eventsMake.filter((evt) => {
      return evt.name !== ds.name && evt.date !== ds.date;
    });
    await users.findOneAndUpdate(
      { email: ds.author },
      {
        eventsMake: arrUpdate2,
      }
    );

    return res.status(200).json({ state: "success" });
  } catch (error) {
    return res.status(500).json({ state: "failure" });
  }
};

const deletePendingEvent = async (req, res) => {
  try {
    const idReq = req.params.id;
    const ds = await pendingEventModel.findByIdAndDelete(idReq);
    return res.status(200).json({ state: "success" });
  } catch (error) {
    return res.status(500).json({ state: "failure" });
  }
};

// const updateEvent = async (req, res) => {
//   try {
//     const {name} = req.body
//     const idReq = req.params.id;
//     const ds = await eventModel.findOneAndUpdate({_id:idReq},updateProduct,{new:true})
//     // chua xong

//     res.status(200).json({ state: "success" });
//   } catch (error) {
//     res.status(500).json({ state: "failure" });
//   }
// };

const getMaDonVi = (item, date) => {
  let data = item.slice(0, item.indexOf(date));
  if (data.includes("CA")) {
    return "CA";
  } else if (data.includes("DA")) {
    return "DA";
  } else if (data.includes("DI")) {
    return "DI";
  } else if (data.includes("FL")) {
    return "FL";
  } else if (data.includes("HG")) {
    return "HG";
  } else if (data.includes("KH")) {
    return "KH";
  } else if (data.includes("KT")) {
    return "KT";
  } else if (data.includes("LK")) {
    return "LK";
  } else if (data.includes("ML")) {
    return "ML";
  } else if (data.includes("MT")) {
    return "MT";
  } else if (data.includes("NN")) {
    return "NN";
  } else if (data.includes("SP")) {
    return "SP";
  } else if (data.includes("TD")) {
    return "TD";
  } else if (data.includes("TN")) {
    return "TN";
  } else if (data.includes("TS")) {
    return "TS";
  } else {
    return "XH";
  }
};

const addDataCTDK = async (req, res) => {
  try {
    const idReq = req.params.id;
    const { date } = req.body;
    const ds = await eventModel.findById(idReq);

    // let dssv = await openDssv(`/${date}`, idReq); // mở theo năm kí và mở file có tên là id

    // Sử lí file và insert vào db
    const buf = new Buffer.alloc(1024 * 17);
    fs.open(`./file/${idReq}.txt`, "r+", function (err, f) {
      if (err) {
        return console.error(err);
      }
      // console.log("File duoc mo thanh cong!");
      fs.read(f, buf, 0, 1024 * 17, 0, function (err, bytes) {
        if (err) {
          console.log(err);
        }
        // In so luong byte da doc.
        if (bytes > 0) {
          let data = buf.toString().split("\r\n");
          // console.log(data);
          let newsv = {};

          data.forEach((item) => {
            if (item.includes(date)) {
              newsv = {
                mssv: item.slice(
                  item.indexOf(date) + 7,
                  item.indexOf(date) + 15
                ),
                maDonVi: getMaDonVi(item, date),
              };

              ds.dsCoTheDangKy.push(newsv);
            }
          });
          ds.save();
        }
      });
    });

    return res.status(200).json({ state: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ state: "failure" });
  }
};

const generateFile = async (req, res) => {
  try {
    const idReq = req.params.id;
    const ds = await eventModel.findById(idReq);

    // doc link pdf và chuyển sang txt
    readFilePDF(ds.limit, idReq);
    // tên file sẽ là id của sự kiện

    return res.status(200).json({ state: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ state: "failure" });
  }
};

const addDataDDK = async (req, res) => {
  try {
    const idReq = req.params.id;
    const { mssv, ten, email, lop, nghanh, maDonVi } = req.body;
    const ds = await eventModel.findById(idReq);
    const user = await users.findOne({ email });
    if (!user) return res.status(400).json({ state: "failure" });

    const userAlready = ds.dsDaDangKy.find((item) => {
      return item.mssv === mssv || item.email === email;
    });

    if (userAlready) return res.status(400).json({ state: "failure" });

    if (ds?.limit === "all") {
      ds.dsDaDangKy.push({
        mssv: mssv,
        ten: ten,
        email: email,
        lop: lop,
        nghanh: nghanh,
        maDonVi: maDonVi,
      });

      await users.findOneAndUpdate(
        { email },
        {
          eventsJoin: [
            ...user.eventsJoin,
            {
              name: ds.name || "",
              author: ds.author || "",
              date: ds.date || "",
              time: ds.time || "",
            },
          ],
        }
      );

      await ds.save();

      return res.status(200).json({ state: "success" });
    } else {
      ds?.dsCoTheDangKy.forEach((e) => {
        if (e.mssv === mssv) {
          // console.log('co the dang ky');
          ds.dsDaDangKy.push({
            mssv: mssv,
            ten: ten,
            email: email,
            lop: lop,
            nghanh: nghanh,
            maDonVi: maDonVi,
          });
          ds.save();
          // return res.status(200).json({ state: "success" });
        }
      });
      return res.status(200).json({ state: "failure" });
    }
  } catch (error) {
    return res.status(500).json({ state: "failure" });
  }
};

const getEventsJoin = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await users.findOne({ email });
    if (!user) return res.status(400).json({ state: "failure" });
    const eventsJoin = user.eventsJoin;

    return res.status(200).json({ state: "success", data: eventsJoin });
  } catch (error) {
    return res.status(500).json({ state: "failure" });
  }
};

const getEventsMake = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await users.findOne({ email });
    if (!user) return res.status(400).json({ state: "failure" });
    const eventsMake = user.eventsMake;

    return res.status(200).json({ state: "success", data: eventsMake });
  } catch (error) {
    return res.status(500).json({ state: "failure" });
  }
};

const softList = async (req, res) => {
  try {
    const idReq = req.params.id;
    const { type, az } = req.body;
    const list = await eventModel.findById(idReq);

    let tmpData = list.dsDaDangKy;
    if (az && tmpData) {
      for (let i = 0; i < tmpData?.length; i++) {
        for (let j = i + 1; j < tmpData.length; j++) {
          if (tmpData[i][type] > tmpData[j][type]) {
            let tmp = tmpData[j];
            tmpData[j] = tmpData[i];
            tmpData[i] = tmp;
          }
        }
      }
    } else {
      for (let i = 0; i < tmpData?.length; i++) {
        for (let j = i + 1; j < tmpData?.length; j++) {
          if (tmpData[i][type] < tmpData[j][type]) {
            let tmp = tmpData[j];
            tmpData[j] = tmpData[i];
            tmpData[i] = tmp;
          }
        }
      }
    }

    await eventModel.findByIdAndUpdate(idReq, { dsDaDangKy: tmpData });

    return res.status(200).json({ state: "success" });
  } catch (error) {
    return res.status(500).json({ state: "failure" });
  }
};

export {
  getDssvCoTheDangKy,
  generateFile,
  softList,
  getEventsJoin,
  getEventsMake,
  getDssvDaDangKy,
  createEvent,
  getEvents,
  addDataCTDK,
  addDataDDK,
  deleteEvent,
  createPendingEvent,
  getPendingEvents,
  deletePendingEvent,
  getEventById,
};
