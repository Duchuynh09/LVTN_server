import fs from "fs";
import { Buffer } from "buffer";
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

// MỞ DANH SÁCH SV ĐƯỢC ĐĂNG KÍ
const openDssv =  (date, nameFile) => {
  const dssv = [];
  var buf = new Buffer.alloc(1024 * 17);

  fs.open(`./file/${nameFile}.txt`, "r+", function (err, f) {
    if (err) {
      return console.error(err);
    }
    console.log("File duoc mo thanh cong!");
    fs.read(f , buf, 0, 1024 * 17, 0, function (err, bytes) {
      if (err) {
        console.log(err);
      }
      // In so luong byte da doc.

      if (bytes > 0) {
        let data = buf.toString().split("\r\n");
        let newsv = {};
        data.forEach((item) => {
          if (item.includes(date)) {
            newsv = {
              mssv: item.slice(item.indexOf(date) + 7, item.indexOf(date) + 15),
              maDonVi: getMaDonVi(item, date),
            };
            dssv.push(newsv);
          }
        });
      }
    });
  });
  console.log(dssv);
  return dssv;
};

export { openDssv };
