const mongoose = require("mongoose");

// Define the schema for the "credentials" collection
const credentialsSchema = new mongoose.Schema(
  {
    appId: {
      type: String,
      required: true,
      unique: true, // Ensure appId is unique
      trim: true, // Removes extra spaces from the value
    },
    appSecret: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the "credentials" model
const Credentials = mongoose.model("Credentials", credentialsSchema);

// Export the model
module.exports = Credentials;