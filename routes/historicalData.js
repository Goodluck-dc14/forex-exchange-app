const express = require("express");
const router = express.Router();
const ExchangeRate = require("../models/ExchangeRate");

router.get("/historical", async (req, res) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // Retrieve historical exchange rate data within the last 7 days
    const historicalRates = await ExchangeRate.find({
      timestamp: { $gte: sevenDaysAgo },
    });

    res.json(historicalRates);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
