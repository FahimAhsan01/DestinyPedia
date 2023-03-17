import express from "express";

const router=express.Router();
import auth from "../middleware/auth.js";

import {addGear,getGears,getGearsbyUser,deleteGear,getRelatedGears,getGearsBySearch,getGearsByTag,updateGear,} from "../controllers/gear.js";

router.post("/",auth,addGear);
router.get("/",getGears);
router.get("/:id", getGear);
router.get("/userGearss/:id",auth,getGearsbyUser);
router.delete("/:id", auth, deleteGear);
router.get("/search", getGearsBySearch);
router.patch("/:id", auth, updateGear);
router.post("/relatedGears", getRelatedGears);
router.get("/tag/:tag", getGearsByTag);

export default router;
