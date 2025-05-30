const validateStationData = (req, res, next) => {
  const { name, location, powerOutput, connectorType, status } = req.body;

  if (
    !name ||
    !location ||
    !location.coordinates ||
    !location.address ||
    powerOutput === undefined ||
    !connectorType
  ) {
    return res.status(400).json({
      message:
        "Name, location (coordinates and address), power output, and connector type are required",
    });
  }

  if (
    !Array.isArray(location.coordinates) ||
    location.coordinates.length !== 2 ||
    typeof location.coordinates[0] !== "number" ||
    typeof location.coordinates[1] !== "number"
  ) {
    return res.status(400).json({
      message:
        "Location coordinates must be an array of two numbers: [longitude, latitude]",
    });
  }

  // Validate power output
  if (typeof powerOutput !== "number" || powerOutput < 0) {
    return res.status(400).json({
      message: "Power output must be a non-negative number",
    });
  }

  // Validate connector type
  const validConnectors = [
    "Type1",
    "Type2",
    "CCS1",
    "CCS2",
    "CHAdeMO",
    "Tesla",
    "NACS",
    "GBT-AC",
    "GBT-DC",
    "Other",
  ];
  if (!validConnectors.includes(connectorType)) {
    return res.status(400).json({
      message: `Invalid connector type. Must be one of: ${validConnectors.join(
        ", "
      )}`,
    });
  }

  // Validate status if provided
  if (status && !["active", "inactive"].includes(status.toLowerCase())) {
    return res.status(400).json({
      message: "Invalid status. Must be 'active' or 'inactive'",
    });
  }

  // Normalize status
  if (status) {
    req.body.status = status.toLowerCase();
  }

  next();
};

module.exports = {
  validateStationData,
};
