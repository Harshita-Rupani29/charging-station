const ChargingStation = require("../models/ChargingStation");

class StationService {
  // Create a new charging station
  async createStation(stationData) {
    try {
      const station = await ChargingStation.create(stationData);
      return station;
    } catch (error) {
      throw error;
    }
  }

  async getAllStations(filters = {}) {
    try {
      const query = {};

      // Filter by status (active/inactive)
      if (filters.status) {
        query.status = filters.status.toLowerCase();
      }

      // Filter by connector type
      if (filters.connectorType) {
        query.connectorType = filters.connectorType;
      }

      // Filter by power output
      if (filters.powerOutput) {
        query.powerOutput = { $gte: Number(filters.powerOutput) };
      }

      // Return filtered and sorted result
      return await ChargingStation.find(query).sort({ name: 1 });
    } catch (error) {
      throw error;
    }
  }

  // Update a charging station
  async updateStation(stationId, updateData) {
    try {
      const station = await ChargingStation.findById(stationId);
      if (!station) {
        throw new Error("Station not found");
      }

      // Apply updates
      Object.assign(station, updateData);

      if (updateData.status) {
        station.status = updateData.status.toLowerCase();
      }

      return await station.save();
    } catch (error) {
      throw error;
    }
  }

  // Delete a charging station
  async deleteStation(stationId) {
    try {
      const station = await ChargingStation.findById(stationId);
      if (!station) {
        throw new Error("Station not found");
      }

      await station.deleteOne();
      return { message: "Station deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new StationService();
