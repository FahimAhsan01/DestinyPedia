import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import {
  createGear,
  deleteGear,
  getRelatedGears,
  getGear,
  getGears,
  getGearsBySearch,
  getGearsByTag,
  getGearsByUser,
  likeGear,
  updateGear,
} from "../controllers/gear.js";

router.get("/search", getGearsBySearch);
router.get("/tag/:tag", getGearsByTag);
router.post("/relatedGears", getRelatedGears);
router.get("/", getGears);
router.get("/:id", getGear);

router.post("/", auth, createGear);
router.delete("/:id", auth, deleteGear);
router.patch("/:id", auth, updateGear);
router.get("/userGears/:id", auth, getGearsByUser);
router.patch("/like/:id", auth, likeGear);

export default router;
