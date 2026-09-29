// Load environment variables
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

const app = express();


// Allow only http://localhost:5173
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        message: "VishaTrace Backend is running",
        status: "success"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        service: "VishaTrace API"
    });
});

app.get("/api/testing", (req, res) => {
    res.json({
      status: "OK",
      service: "VishaTrace API"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`VishaTrace Backend running on http://localhost:${PORT}`);
});
