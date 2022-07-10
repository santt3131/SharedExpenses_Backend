const res = require("express/lib/response");
const Expense = require("./expense.model");

const findMany = async (req, res) => {
  const { id } = req.params;
  try {
    const docs = await Expense.find().lean().exec();
    res.status(200).json({ results: docs });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal error" });
  }
};

const createOne = async (req, res) => {
  try {
    const newExpense = req.body;
    const doc = await Expense.create(newExpense);
    res.status(200).send({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Creation failed" });
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
  } catch (e) {
    console.log(e);
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
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Cannot delete" });
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Expense.findOne({ _id: id });
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Cannot get expense" });
  }
};

module.exports = {
  findMany,
  createOne,
  findOne,
  updateOne,
  deleteOne,
};
