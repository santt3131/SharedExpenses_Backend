const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema= new Schema(
    {
        nombre:{
            type:String,
            required: true,
            unique:true,
            maxlength:100
        },
        apellidos:{
            type:String,
            required: true,
            maxlength:100
        },
        email:{
            type: String,
            required: true,
            maxlength:100
        },
        password:{
            type: String,
            required: true,
            minlength: 9,
            maxlength: 9
        }
    }
);

const User= mongoose.model('User', UserSchema,);
module.exports = User;