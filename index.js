const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(express.json());

app.use(cors());

const conversionRoute = require("./routes/conversion");
const exchangeRatesRoute = require("./routes/exchangeRates");
const historicalDataRoute = require("./routes/historicalData");

app.use("/api", conversionRoute);
app.use("/api", exchangeRatesRoute);
app.use("/api", historicalDataRoute);

app.get("/", (req, res) => {
  res.send("Welcome to forex exchange app");
});

// Error handling middleware
app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err.message);
  });
