import { sponsor } from "../models/sponsor.js";
export const findAll = async (req, res) => {
  try {
    const sponsors = await sponsor.find({});
    return res.status(200).json(sponsors);
  } catch (error) {
    return res.status(402).json({ err: error.message });
  }
};
export const create = async (req, res) => {
  const { name, address, phone } = req.body;
  try {
    const newSponesor = await sponsor.create({
      name: name,
      address: address,
      phone: phone,
    });
    return res.status(200).json(newSponesor);
  } catch (error) {
    return res.status(402).json(error.message);
  }
};
export const findById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await sponsor.findById(id);
    return res.send(data);
  } catch (error) {
    return res.send(error.message);
  }
};
export const deleteSponsor = async (req, res) => {
  const id = req.params.id;
  try {
    await sponsor.findByIdAndDelete(id);
    return res.json({ state: "success" });
  } catch (error) {
    return res.send(error.message);
  }
};
export const update = async (req, res) => {
  const id = req.params.id;
  const changeSponsorProps = req.body;
  try {
    const newSponsor = await sponsor.findOneAndUpdate(
      { _id: id },
      {
        ...changeSponsorProps,
      },
      { returnDocument: "after" }
    );
    return res.status(200).json(newSponsor);
  } catch (error) {
    return res.status(402).json(error.message);
  }
};
