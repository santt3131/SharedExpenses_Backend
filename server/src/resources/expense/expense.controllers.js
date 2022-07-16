const res = require("express/lib/response");
const Expense = require("./expense.model");
const User = require("../user/user.model");
const Group = require("../group/group.model");

const findMany = async (req, res) => {
  const { id } = req.params;
  try {
    const docs = await Expense.find()
      .populate("users.userId", "name email")
      .lean()
      .exec();
    res.status(200).json({ results: docs });
  } catch (error) {
    res.status(500).json({ error: "Internal error" });
  }
};

const createOne = async (req, res) => {
  try {
    // Verificar que los ID de usuario recibidos existen en la colección users
    const reqUsersArray = req.body.users;
    let userIds = reqUsersArray.map((user) => user.userId);
    const collUsersArray = await User.find({
      _id: {
        $in: userIds,
      },
    });
    if (userIds.length !== collUsersArray.length) {
      return res
        .status(404)
        .json({ error: "Cannot create expense. Some users do not exist" });
    }

    // Crear gasto
    const newExpense = await Expense.create(req.body);
    if (!newExpense) {
      return res.status(500).json({ error: "Cannot create the expense" });
    }

    // Actualizar gasto en la colección groups
    const { groupId } = req.body;
    const expenses = [
      {
        expenseId: newExpense._id,
        expenseTitle: newExpense.title,
      },
    ];
    const doc = await Group.findOneAndUpdate(
      { _id: groupId },
      {
        $push: {
          expenses: expenses,
        },
      },
      { new: true }
    );
    if (!doc) {
      return res
        .status(500)
        .json({ error: "Cannot update the expense in groups collection" });
    }

    res.status(201).send({ results: [newExpense] });
  } catch (error) {
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
    res.status(500).json({ error: "Cannot update" });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Expense.find({
      _id: id,
      $expr: {
        $gt: [{ $size: { $ifNull: ["$payments", []] } }, 0],
      },
    });
    if (doc.length > 0) {
      return res
        .status(500)
        .json({ error: "Cannot delete. This expense contains payments" });
    }
    //Falta eliminar este expense en el grupo correspondiente
    const toDelete = await Expense.findOneAndDelete({ _id: id }, { new: true });
    res.status(200).json({ results: [toDelete] });
  } catch (error) {
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
