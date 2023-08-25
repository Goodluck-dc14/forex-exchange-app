const express = require("express");
const router = express.Router();
const axios = require("axios");
const ExchangeRate = require("../models/ExchangeRate");

module.exports = router;
router.get("/live", async (req, res) => {
  try {
    const apiKey = process.env.EXCHANGE_RATES_API_KEY;
    const baseCurrency = "USD";

    const response = await axios.get(
      `https://api.exchangeratesapi.io/latest?base=${baseCurrency}&access_key=${apiKey}`
    );

    const exchangeRates = response.data.rates;

    if (!exchangeRates) {
      return res.status(500).json({ error: "Exchange rate data not found" });
    }

    const currentTime = new Date();

    // Store fetched exchange rates in the database
    const storedExchangeRates = await ExchangeRate.insertMany(
      Object.keys(exchangeRates).map((currency) => ({
        from: baseCurrency,
        to: currency,
        rate: exchangeRates[currency],
        timestamp: currentTime,
      }))
    );

    res.json(storedExchangeRates);
  } catch (error) {
    console.error("Error in exchangeRate route:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
