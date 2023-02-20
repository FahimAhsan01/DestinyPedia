import mongoose from "mongoose";

const gearSchema=mongoose.Schema({
    title:String,
    description:String,
    name:String,
    creator:String,
    tags:[String],
    imageFile:String,
    createdAt:{
        type:Date,
        default:0.
    },
    likeCount:{
        type:Number,
        default:0,
    },
});

const GearModel=mongoose.model("Gear",gearSchema);

export default GearModel;