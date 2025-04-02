import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import { AppDataSource } from "../config";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('public/uploads'));
app.use("/api", productRoutes);

AppDataSource.initialize().then(() => {
  console.log("Database Connected");
  app.listen(3000, () => console.log("Server running on port 3000"));
});
