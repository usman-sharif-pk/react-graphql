const rootResolver = {
  ...require("./bookingResolver"),
  ...require("./authResolver"),
  ...require("./eventResolver"),
};

module.exports = rootResolver;
