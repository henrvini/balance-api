import express, { Request, Response } from "express";
import accountRoutes from "./routes/accountRoutes";
import resetRoutes from "./routes/resetRoutes";
import eventRoutes from "./routes/eventRoutes";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the Balance API!");
});

app.use("/", accountRoutes);
app.use("/", resetRoutes);
app.use("/", eventRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
