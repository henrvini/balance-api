import express from "express";
import accountRoutes from "./routes/accountRoutes";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/", accountRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
