const express = require("express");
const router = express.Router();

const stationService = require("../services/stationService");
const validateToken = require("../middlewares/validateToken");
const { validateStationData } = require("../middlewares/validation");

router.use(validateToken);

// Get all stations with optional filters

router.get("/stations", async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      powerOutput: req.query.powerOutput,
      connectorType: req.query.connectorType,
    };

    const stations = await stationService.getAllStations(filters);
    res.json(stations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get station by ID
router.get("/stations/:id", async (req, res) => {
  try {
    const station = await stationService.getStationById(req.params.id);
    res.json(station);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Create a new station
router.post("/stations", validateStationData, async (req, res) => {
  try {
    const station = await stationService.createStation(req.body);
    res.status(201).json(station);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update station
router.put("/stations/:id", validateStationData, async (req, res) => {
  try {
    const station = await stationService.updateStation(req.params.id, req.body);
    console.log("Received update data:", req.body);
    res.json(station);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete station
router.delete("/stations/:id", async (req, res) => {
  try {
    await stationService.deleteStation(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
