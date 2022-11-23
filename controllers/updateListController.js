import { readFilePDF } from "../service/handleFilePDF.js";
import { createDssvCoTheDangKy } from "./dssvController.js";

const updateList = (req, res) => {
  // tạo file txt từ file pdf theo link
  const link = req.body.link;
  readFilePDF(link);
  createDssvCoTheDangKy()

};

export { updateList};
