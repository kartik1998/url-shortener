const env = process.env;

const config = {
  PORT: env.PORT || 8080,
  MONGO_URI: env.MONGO_URI || "mongodb://127.0.0.1:27017/db",
};

module.exports = config;
