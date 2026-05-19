import express from "express";
import { Lead } from "../models/Lead";

const router = express.Router();

// GET
router.get("/", async (req, res) => {
  const leads = await Lead.find();
  res.json({ leads });
});

// POST
router.post("/", async (req, res) => {
  const lead = await Lead.create(req.body);
  res.json({ lead });
});

export default router;