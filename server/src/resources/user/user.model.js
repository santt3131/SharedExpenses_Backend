const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema= new Schema(
    {
        name:{
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
            maxlength: 12
        },
        groups: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Group'
            },
        ]
    }
);

//UserSchema.index({ _id : 1}) 
const User= mongoose.model('User', UserSchema);
module.exports = User;