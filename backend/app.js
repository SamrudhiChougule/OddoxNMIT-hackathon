import express from "express";
import cors from "cors";
import productRoutes from "./routes/products.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Serve backend API
app.use("/api/products", productRoutes);

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Serve index.html on root
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

export default app;