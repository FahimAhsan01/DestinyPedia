import express from "express";

const router=express.Router();

import {addGear,getGears,getGearsbyUser} from "../controllers/gear.js";

router.post("/",addGear);
router.get("/",getGears);
router.get("/userTours/:id",getGearsbyUser);

export default router;