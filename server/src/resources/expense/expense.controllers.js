const res = require("express/lib/response");
const Expense = require("./expense.model");

const findMany = async (req, res) => {
  const { id } = req.params;
  try {
    const docs = await Expense.find()
      .populate("users.userId", "name email")
      .lean()
      .exec();
    res.status(200).json({ results: docs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal error" });
  }
};

const createOne = async (req, res) => {
  try {
    const newExpense = req.body;
    const doc = await Expense.create(newExpense);
    res.status(200).send({ results: [doc] });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Cannot create" });
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Expense.findOne({ _id: id })
      .populate("users.userId", "name email")
      .exec();
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cannot get" });
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Expense.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cannot update" });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Expense.findOneAndDelete({ _id: id }, { new: true });
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cannot delete" });
  }
};

module.exports = {
  findMany,
  createOne,
  findOne,
  updateOne,
  deleteOne,
};
