const Group = require("./Group.model");
const User = require("../user/User.model");
const mongoose = require('mongoose');

const findMany = async (req, res)=>{
    try {
        const docs = await Group.find().populate("users").lean().exec();
        res.status(200).json({results: docs});
    } catch (error) {
        console.log(e);
        res.status(500).json({ error: 'Internal error'});
    }
}


const findOne = async(req, res)=>{
    const { id } = req.params;
    try {
        const doc = await Group.findOne({ _id: id}).populate("users").exec();
        if(!doc){
            return res.status(400).json({ results : [doc] });
        }
        res.status(200).json({ results: [doc]});
    } catch (error) {
        console.log(e);
        res.status(500).json({ error: 'Cannot get Cutomer'});
    }
}

const createOne = async (req, res)=>{
    try {
        const newGroup = req.body;
        const doc = await Group.create(newGroup);
        res.status(200).json({ results : [doc]});
    } catch (error) {
        console.log(e);
        res.status(500).json({ error: " Creation failed"});   
    }
}

const createGroupUser = async (req,res)=>{
    try {

        //PASO 1- Verificar que los ids users existan en la coleccion USERS
        const arrayUser = req.body.users;

        let isArrayuserInUserCollection = await User.find({
            _id: {
                $in: arrayUser
            }
        });

        //si todos los usuarios buscados son encontrados
        if(isArrayuserInUserCollection.length !== arrayUser.length){
             return res.status(500).json({ error: 'Cannot update, some User id was not found'});
         }        

        //PASO 2- Creo el grupo
        const groupNew = await Group.create(req.body);


        //PASO 3 - Actualizo user
        //A todos esos usuarios del array del objeto, le agrego a cada uno el id del grupo
        const doc = await User.updateMany({
            _id: {
                $in: req.body.users
            }
        },
        {
            $push:{
                groups: [groupNew._id]
            }
        },
        {multi: true}
        );
        
        if(!doc){
            return res.status(404).json({ error : "Not found"});
        }

        res.status(200).json({ results: [doc]});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Cannot update'});
    }
}

const updateOne = async (req,res)=>{
    const { id } = req.params;
    try {
        const doc = await Group.findOneAndUpdate({ _id: id}, 
            req.body, { new: true});
        if(!doc){
            return res.status(404).json({ error : "Not found"});
        }
        res.status(200).json({ results: [doc]});
    } catch (error) {
        console.log(e);
        res.status(500).json({ error: 'Cannot update'});
    }
}

const deleteOne = async(req, res)=>{
    const { id } = req.params;
    try {
        const doc = await Group.findOneAndDelete({ _id: id}, { new: true});
        if(!doc){
            return res.status(404).json({ error : "Not found"});
        }
        res.status(200).json({ results: [doc]});
    } catch (error) {
        console.log(e);
        res.status(500).json({ error: 'Cannot delete'});
    }
}



module.exports = {
    findMany,
    findOne,
    createOne,
    updateOne,
    deleteOne,
    createGroupUser
}
