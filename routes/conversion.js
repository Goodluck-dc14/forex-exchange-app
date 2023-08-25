const express = require("express");
const router = express.Router();
const ExchangeRate = require("../models/ExchangeRate");

router.post("/convert", async (req, res) => {
  try {
    const { from, to, amount } = req.body;

    // Find the most recent exchange rate for the given currencies
    const exchangeRateData = await ExchangeRate.findOne({ from, to }).sort({
      timestamp: -1,
    });

    if (!exchangeRateData) {
      return res.status(404).json({ error: "Exchange rate data not found" });
    }

    const exchangeRate = exchangeRateData.rate;

    // Calculate the converted amount
    const convertedAmount = amount * exchangeRate;

    res.json({ convertedAmount });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
