import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

import errorHandler from "./middleware/errorMiddleware.js";
import notFound from "./middleware/notFoundMiddleware.js";

dotenv.config();

connectDB();

const app = express();

// ================= MIDDLEWARE =================

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

// ================= ROOT ROUTE =================

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Job Tracker Backend Running 🚀"
    });

});

// ================= API ROUTES =================

app.use("/api/auth", authRoutes);

app.use("/api/jobs", jobRoutes);

// ================= ERROR HANDLING =================

// Must come AFTER all valid routes
app.use(notFound);

app.use(errorHandler);

// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`🚀 Server running on port ${PORT}`);

});