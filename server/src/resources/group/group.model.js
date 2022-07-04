const mongoose = require("mongoose");
const { Schema } = mongoose;

const GroupSchema = new Schema(
    {
        groupName:{
            type:String,
            required: true,
            maxlength:100
        },
        groupDescription:{
            type: String,
            required: true,
            maxlength:100
        },
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        ]
    }
);

//GroupSchema.index({ _id : 1}) 
const Group= mongoose.model('Group', GroupSchema);
module.exports = Group;