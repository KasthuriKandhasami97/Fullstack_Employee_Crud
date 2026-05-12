require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
//connect db
connectDB();

// app.use(cors());
app.use(cors({
    origin:'*'
}));
//middleware
app.use(express.json());

//routes

app.use("/api/auth",authRoutes);
app.use("/api/employees",employeeRoutes);

app.listen(5000, () => console.log("Server running"));