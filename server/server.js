const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Lead = require("./models/Lead");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connect
mongoose
  .connect(
    "mongodb+srv://cs07777770_db_user:Chirag%4012@cluster0.jfhf4py.mongodb.net/smart-leads"
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Home
app.get("/", (req, res) => {
  res.send("API WORKING");
});

// Get Leads
app.get("/api/leads", async (req, res) => {
  const leads = await Lead.find();

  res.json({ leads });
});

// Add Lead
app.post("/api/leads", async (req, res) => {
  const newLead = await Lead.create(req.body);

  res.json({
    message: "Lead Added",
    lead: newLead,
  });
});

// Delete Lead
app.delete("/api/leads/:id", async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);

  res.json({
    message: "Lead Deleted",
  });
});

// Update Lead
app.put("/api/leads/:id", async (req, res) => {
  await Lead.findByIdAndUpdate(req.params.id, req.body);

  res.json({
    message: "Lead Updated",
  });
});

app.listen(5000, () => {
  console.log("SERVER RUNNING ON 5000");
});