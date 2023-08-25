const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Parse JSON bodies
app.use(express.json());

// Routes
const conversionRoute = require("./routes/conversion");
const exchangeRatesRoute = require("./routes/exchangeRates");
const historicalDataRoute = require("./routes/historicalData");
app.use("/api", conversionRoute);
app.use("/api", exchangeRatesRoute);
app.use("/api", historicalDataRoute);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to forex exchange app");
});

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB Atlas
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

// Start the server after connecting to the database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
