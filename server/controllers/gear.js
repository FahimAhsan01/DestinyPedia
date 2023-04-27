import GearModel from "../models/gear.js";
import mongoose from "mongoose";

export const createGear = async (req, res) => {
  const gear = req.body;
  const newGear = new GearModel({
    ...gear,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newGear.save();
    res.status(201).json(newGear);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getGears = async (req, res) => {
  const { page } = req.query;
  try {
    // const gears = await GearModel.find();
    // res.status(200).json(gears);

    const limit = 6;
    const startIndex = (Number(page) - 1) * limit;
    const total = await GearModel.countDocuments({});
    const gears = await GearModel.find().limit(limit).skip(startIndex);
    res.json({
      data: gears,
      currentPage: Number(page),
      totalGears: total,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getGear = async (req, res) => {
  const { id } = req.params;
  try {
    const gear = await GearModel.findById(id);
    res.status(200).json(gear);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getGearsByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const userGears = await GearModel.find({ creator: id });
  res.status(200).json(userGears);
};

export const deleteGear = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No gear exist with id: ${id}` });
    }
    await GearModel.findByIdAndRemove(id);
    res.json({ message: "Gear deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updateGear = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No gear exist with id: ${id}` });
    }

    const updatedGear = {
      creator,
      title,
      description,
      tags,
      imageFile,
      _id: id,
    };
    await GearModel.findByIdAndUpdate(id, updatedGear, { new: true });
    res.json(updatedGear);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getGearsBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const gears = await GearModel.find({ title });
    res.json(gears);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getGearsByTag = async (req, res) => {
  const { tag } = req.params;
  try {
    const gears = await GearModel.find({ tags: { $in: tag } });
    res.json(gears);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getRelatedGears = async (req, res) => {
  const tags = req.body;
  try {
    const gears = await GearModel.find({ tags: { $in: tags } });
    res.json(gears);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const likeGear = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.userId) {
      return res.json({ message: "User is not authenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No gear exist with id: ${id}` });
    }

    const gear = await GearModel.findById(id);

    const index = gear.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      gear.likes.push(req.userId);
    } else {
      gear.likes = gear.likes.filter((id) => id !== String(req.userId));
    }

    const updatedGear = await GearModel.findByIdAndUpdate(id, gear, {
      new: true,
    });

    res.status(200).json(updatedGear);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
