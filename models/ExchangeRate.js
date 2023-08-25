const mongoose = require("mongoose");

const exchangeRateSchema = new mongoose.Schema({
  from: String,
  to: String,
  rate: Number,
  timestamp: Date,
});

module.exports = mongoose.model("ExchangeRate", exchangeRateSchema);
