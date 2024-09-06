import express from "express";
import accountRoutes from "./routes/accountRoutes";
import resetRoutes from "./routes/resetRoutes";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/", accountRoutes);
app.use("/", resetRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
