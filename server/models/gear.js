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
        default: new Date(),
    },
    likeCount:{
        type:Number,
        default:[],
    },
});

const GearModel=mongoose.model("Gear",gearSchema);

export default GearModel;