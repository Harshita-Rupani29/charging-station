require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protectedRoutes");

// Database connection
connection();

const corsOptions = {
  origin: "https://charging-station-frontend.onrender.com",
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/services", protectedRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}...`));
