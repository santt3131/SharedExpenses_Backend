const Category = require("./category.model");

const createOne = async (req, res) => {
  try {
    const newCategory = req.body;
    const doc = await Category.create(newCategory);
    res.status(200).json({ results: [doc] });
  } catch (error) {
    res.status(500).json({ error: "Creation failed" });
  }
};

const findMany = async (req, res) => {
  try {
    const docs = await Category.find();
    res.status(200).json({ results: docs });
  } catch (error) {
    res.status(500).json({ error: "Internal error" });
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Category.findOne({ _id: id });
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
    const doc = await Category.findOneAndUpdate({ _id: id }, req.body, {
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
    const doc = await Category.findOneAndDelete({ _id: id }, { new: true });
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
