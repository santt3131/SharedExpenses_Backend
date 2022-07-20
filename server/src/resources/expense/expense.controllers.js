const res = require("express/lib/response");
const Expense = require("./expense.model");
const User = require("../user/user.model");
const Group = require("../group/group.model");
const mongoose = require("mongoose");

const findMany = async (req, res) => {
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

    // Crear el gasto
    const newExpense = await Expense.create(req.body);
    if (!newExpense) {
      return res.status(500).json({ error: "Cannot create the expense" });
    }

    // Actualizar el gasto en la colección groups
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

const addPayments = async (req, res) => {
  const { id } = req.params;
  console.log('los pagos son', req.body);
  try {
    const doc = await Expense.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          payments: req.body
        }
      },
      { new: true }
    );

    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (error) {
    res.status(500).json({ error: "Cannot update" });
  }
};

const deletePayments = async (req, res) => {
  const { id } = req.params; //id de expenses
  const { _id } = req.body;
  const idPayment = mongoose.Types.ObjectId(_id);

  try {
    const doc = await Expense.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          payments: { _id: idPayment }
        },
      },
      { new: true });
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cannot delete" });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    // Verificar si el gasto posee pagos asociados
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

    // Eliminar el gasto en la colección groups
    const deleteInGroup = await Group.updateMany(
      {},
      {
        $pull: {
          expenses: { expenseId: id },
        },
      }
    );
    if (!deleteInGroup) {
      return res
        .status(500)
        .json({ error: "Cannot delete this expense in Groups collection" });
    }

    // Eliminar el gasto en la colección expenses
    const toDelete = await Expense.findOneAndDelete({ _id: id }, { new: true });
    if (!toDelete) {
      return res.status(500).json({ error: "Not found" });
    }
    res.status(200).json({ results: [toDelete] });
  } catch (error) {
    res.status(500).json({ error: "Cannot delete" });
  }
};

module.exports = {
  findMany,
  createOne,
  addPayments,
  deletePayments,
  findOne,
  updateOne,
  deleteOne,
};
