const mongoose = require("mongoose");
const chargingStationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    powerOutput: {
      type: Number, // in kW
      required: true,
      min: 0,
    },
    connectorType: {
      type: String,
      required: true,
      enum: [
        "Type1",
        "Type2",
        "CCS1",
        "CCS2",
        "CHAdeMO",
        "Tesla",
        "NACS",
        "GBT-AC",
        "GBT-DC",
      ],
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

chargingStationSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("ChargingStation", chargingStationSchema);
