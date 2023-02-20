import express from "express";
import GearModel from "../models/gear.js";
import mongoose from "mongoose";

export const addGear=async(req,res)=>{
    const gear=req.body;
    const newGear=new GearModel({
        ...gear,
        createdAt:new Date().toISOString()
    });

    try{
        await newGear.save();
        res.status(201).json(newGear);
    }
    catch(error){
        res.status(404).json({message:"Oops, something went wrong"});
    }
};

export const getGears=async(req,res)=>{
    try{
        const gears=await GearModel.find();
        res.status(200).json(gears);
    }
    catch(error){
        res.status(404).json({message:"Oops, something went wrong"});
    }

    
};

export const getGearsbyUser=async(req,res)=>{
    const{id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"User does not exist"})
    }
    const userGears=await GearModel.find({creator:id});
    res.status(200).json(userGears);
};