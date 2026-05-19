import { Request, Response } from "express";
import Lead from "../models/Lead";

export const getLeads = async (req: Request, res: Response) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createLead = async (req: Request, res: Response) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};