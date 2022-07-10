const Group = require("./group.model");

const findMany = async (req, res) => {
  try {
    const docs = await Group.find()
      .populate("users", "name email")
      .lean()
      .exec();
    res.status(200).json({ results: docs });
  } catch (error) {
    res.status(500).json({ error: "Internal error" });
  }
};

const createOne = async (req, res) => {
  try {
    const newGroup = req.body;
    const doc = await Group.create(newGroup);
    res.status(200).json({ results: [doc] });
  } catch (error) {
    res.status(500).json({ error: "Cannot create" });
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Group.findOne({ _id: id })
      .populate("users", "name email")
      .exec();
    if (!doc) {
      return res.status(400).json({ results: [doc] });
    }
    res.status(200).json({ results: [doc] });
  } catch (error) {
    res.status(500).json({ error: "Cannot get" });
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Group.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (error) {
    res.status(500).json({ error: "Cannot update" });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Group.findOneAndDelete({ _id: id }, { new: true });
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (error) {
    res.status(500).json({ error: "Cannot delete" });
  }
};

module.exports = {
  findMany,
  findOne,
  createOne,
  updateOne,
  deleteOne,
};
