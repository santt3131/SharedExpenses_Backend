const User = require("./user.model");
const Expense = require("../expense/expense.model");

const findMany = async (req, res) => {
  try {
    const docs = await User.find().populate("groups").lean().exec();
    res.status(200).json({ results: docs });
  } catch (error) {
    console.log(e);
    res.status(500).json({ error: "Internal error" });
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await User.findOne({ _id: id }).populate("groups").exec();
    if (!doc) {
      return res.status(400).json({ results: [doc] });
    }
    res.status(200).json({ results: [doc] });
  } catch (error) {
    console.log(e);
    res.status(500).json({ error: "Cannot get Cutomer" });
  }
};

const createOne = async (req, res) => {
  try {
    const newUser = req.body;
    console.log("new User es", newUser);
    const doc = await User.create(newUser);
    console.log("doc es ", doc);
    res.status(201).json({ results: [doc] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: " Creation failed" });
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (error) {
    console.log(e);
    res.status(500).json({ error: "Cannot update" });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await User.findOneAndDelete({ _id: id }, { new: true });
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (error) {
    console.log(e);
    res.status(500).json({ error: "Cannot delete" });
  }
};

const findManyPaymentsFrom = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Expense.find({
      payments: { $elemMatch: { userFromId: id } },
    });
    if (!doc) {
      return res.status(400).json({ results: [doc] });
    }
    res.status(200).json({ results: [doc] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cannot get payments from this user" });
  }
};

const findManyPaymentsTo = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Expense.find({
      payments: { $elemMatch: { userToId: id } },
    });
    if (!doc) {
      return res.status(400).json({ results: [doc] });
    }
    res.status(200).json({ results: [doc] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cannot get payments to this user" });
  }
};

module.exports = {
  findMany,
  findOne,
  createOne,
  updateOne,
  deleteOne,
  findManyPaymentsFrom,
  findManyPaymentsTo,
};
