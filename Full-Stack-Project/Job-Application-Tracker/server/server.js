import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

import errorHandler from "./middleware/errorMiddleware.js";
import notFound from "./middleware/notFoundMiddleware.js";

dotenv.config();

connectDB();

const app = express();



app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));


app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Job Tracker Backend Running 🚀"
    });

});

// ================= API ROUTES =================

app.use("/api/auth", authRoutes);

app.use("/api/jobs", jobRoutes);
app.use("/api/resumes", resumeRoutes);
app.use(notFound);
app.use(errorHandler);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`🚀 Server running on port ${PORT}`);

});