const Group = require("./group.model");
const User = require("../user/user.model");

const findMany = async (req, res) => {
  try {
    const docs = await Group.find()
      .lean()
      .populate("users", "_id name email")
      .exec();
    res.status(200).json({ results: docs });
  } catch (error) {
    res.status(500).json({ error: "Internal error" });
  }
};

const expensesInGroup = async (req, res) => {
  try {
    const docs = await Group.find({}, { expenses: 1, _id: 0 });
    res.status(200).json({ results: docs });
  } catch (error) {
    res.status(500).json({ error: "Internal error" });
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Group.findOne({ _id: id })
      .populate("users", "_id name email")
      .exec();
    if (!doc) {
      return res.status(400).json({ results: [doc] });
    }
    res.status(200).json({ results: [doc] });
  } catch (error) {
    console.log(e);
    res.status(500).json({ error: "Cannot get Cutomer" });
  }
};

const createGroupUser = async (req, res) => {
  try {
    //PASO 1- Verificar que todos los IDs de usuario existan en la coleccion USERS
    friends = req.body.friends;
    arrayUser = [];

    for (i = 0; i < friends.length; i++) {
      if (friends[i].selected === true) {
        arrayUser.push(friends[i].friendId);
      }
    }

    let isArrayuserInUserCollection = await User.find({
      _id: {
        $in: arrayUser,
      },
    });

    //si todos los usuarios buscados son encontrados
    if (isArrayuserInUserCollection.length !== arrayUser.length) {
      return res
        .status(500)
        .json({ error: "Cannot update, some user IDs were not found" });
    }

    //PASO 2- Creo el grupo
    const gr = {
      groupName: req.body.groupName,
      groupDescription: req.body.groupDescription,
      ownerId: req.body.ownerId,
      users: arrayUser,
    };
    const groupNew = await Group.create(gr);

    if (!groupNew) {
      return res.status(500).json({ error: "Group was not created" });
    }

    //PASO 3 - Actualizo user
    //A todos esos usuarios del array del objeto, le agrego a cada uno el id del grupo
    const doc = await User.updateMany(
      {
        _id: {
          $in: req.body.users,
        },
      },
      {
        $push: {
          groups: [groupNew._id],
        },
      },
      {
        multi: true,
      }
    );

    if (!doc) {
      return res.status(404).json({ error: "Cannot update users groups" });
    }

    res.status(201).json({ results: "Group was created with its users" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cannot create the group" });
  }
};

//Solo actualizará groupName and groupDescripción
//Agrego los expenses...
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
    console.log(error);
    res.status(500).json({ error: "Cannot update" });
  }
};

const deleteOne = async (req, res) => {
  const { idUser } = req.params;
  try {
    //PASO 0 - SOLO PERMITIR SI NO HAY NINGUN GASTO DE POR MEDIO.
    //PASO 1- Verifico si ese id de grupo...DONE docUser, docGroup
    //PASO 2 - Elimino de users todos el grupo que tenga asociado
    const docUser = await User.updateMany(
      {}, //all documents
      {
        $pull: {
          groups: [idUser],
        },
      },
      { multi: true }
    );

    console.log("user", docUser);

    if (!docUser) {
      return res.status(404).json({ error: "Not found" });
    }

    //PASO 3 - Elimino el propio grupo
    const docGroup = await Group.findOneAndDelete(
      { _id: idUser },
      { new: true }
    );

    if (!docGroup) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json({ results: [docGroup] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cannot delete" });
  }
};

module.exports = {
  findMany,
  findOne,
  updateOne,
  deleteOne,
  createGroupUser,
  expensesInGroup,
};
