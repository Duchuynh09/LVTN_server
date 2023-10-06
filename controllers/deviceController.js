import { device } from "../models/device.js";
export const findAll = async (req, res) => {
  try {
    const devices = await device.find({});
    return res.status(200).json(devices);
  } catch (error) {
    return res.status(402).json({ err: error.message });
  }
};
export const create = async (req, res) => {
  const { name, description, stock } = req.body;
  try {
    const newDevice = await device.create({
      name: name,
      description: description,
      stock: stock,
    });
    return res.status(200).json(newDevice);
  } catch (error) {
    return res.status(402).json(error.message);
  }
};
export const findById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await device.findById(id);
    return res.send(data);
  } catch (error) {
    return res.send(error.message);
  }
};
export const deleteDevice = async (req, res) => {
  const id = req.params.id;
  try {
    await device.findByIdAndDelete(id);
    return res.json({ state: "success" });
  } catch (error) {
    return res.send(error.message);
  }
};
export const update = async (req, res) => {
  const id = req.params.id;
  const changeDeviceProps = req.body;
  try {
    const newDevice = await device.findOneAndUpdate(
      { _id: id },
      {
        ...changeDeviceProps,
      },
      { returnDocument: "after" }
    );
    return res.status(200).json(newDevice);
  } catch (error) {
    return res.status(402).json(error.message);
  }
};
