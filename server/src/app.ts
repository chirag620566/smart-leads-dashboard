import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import leadRoutes from "./routes/leadRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

export default app;