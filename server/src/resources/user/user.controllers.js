const User = require("./user.model");
const Expense = require("../expense/expense.model");
const Auth = require("../user/auth/auth.service");
const users = require("./user.service");
const { catchErrors, TodosApiError } = require("../../errors");
const { needsAuthToken } = require("../user/auth/auth.middleware");

//const config = require("../config");

const findMany = async (req, res) => {
  try {
    const docs = await User.find().populate("groups").lean().exec();
    res.status(200).json({ results: docs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal error" });
  }
};

const findManyExpenses = async (req, res) => {
  const { id } = req.params;
  try {
    const docs = await Expense.find({ 'users.userId': id })
      .lean()
      .exec();
    res.status(200).json({ results: docs });

  } catch (error) {
    res.status(500).send({ error: "Internal error" });
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
    console.log(error);
    res.status(500).json({ error: "Cannot get Cutomer" });
  }
};
const findOneByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const doc = await User.findOne({ "email": email });
    if (!doc) {
      console.log(email);
      return res.status(400).json({ results: [doc] });
    }
    res.status(200).json({ results: [doc] });
    console.log(doc.name);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cannot get Cutomer" });
  }
};

const createOne = async (req, res) => {
  try {
    const newUser = req.body;
    console.log("new User es", newUser);
    const encryptedPassword = await Auth.encryptPassword(newUser.password);
    const newdata=[
      {
           "name":newUser.name,
            "email":newUser.email,
            "password":encryptedPassword,
       }
   ]   ;
   
   const exist = await User.findOne({ "email": newUser.email });
   if(!exist){
    const doc = await User.create( newdata);
    console.log("doc es ", doc);
    res.status(201).json({ results: [doc] });
    console.log("user created succesfully");

   }
   else {
    console.log("user exists");
    res.status(200).json({ error: "user exists" });
   }
    
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: "failed to create the user account" });
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
    console.log(error);
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
    console.log(error);
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

const findMyFriends = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await User.findOne({ _id: id }, { friends: 1, _id: 0 });
    if (!doc) {
      return res.status(400).json({ results: [doc] });
    }
    res.status(200).json({ results: [doc] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cannot get friends of this user" });
  }
};

const findMyActiveFriends = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await User.findOne(
      {
        _id: id,
        friends: { $elemMatch: { friendId: "" } },
      },
      { friends: 1, _id: 0 }
    );
    if (!doc) {
      return res.status(400).json({ results: [doc] });
    }
    res.status(200).json({ results: [doc] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cannot get friends of this user" });
  }
};

const deleteFriend = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  // Faltan verificaciones del amigo a eliminar

  try {
    const doc = await User.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          friends: { friendEmail: email },
        },
      },
      { new: true }
    );
    if (!doc) {
      return res.status(404).json({ error: "Friend not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cannot delete this friend" });
  }
};

const findMyGroups = async (req, res) => {
  const { id } = req.params;
  try {
    //const doc = await User.findOne({ _id: id }, { groups: 1, _id: 0 });
    const doc = await User.findOne({ _id: id }, { groups: 1, _id: 0 })
      .populate("groups", "_id groupName groupDescription ownerId")
      .exec();
    if (!doc) {
      return res.status(400).json({ results: [doc] });
    }
    res.status(200).json({ results: [doc] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cannot get groups of this user" });
  }


};

module.exports = {
  findMany,
  findOne,
  findOneByEmail,
  findManyExpenses,
  createOne,
  updateOne,
  deleteOne,
  findManyPaymentsFrom,
  findManyPaymentsTo,
  findMyFriends,
  deleteFriend,
  findMyGroups,
  findMyActiveFriends,
};
