const mongoose = require("mongoose");

// Define the schema for the "url" collection
const urlSchema = new mongoose.Schema(
  {
    completeUrl: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces from the value
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true, // Ensure each shortUrl is unique
      trim: true,
    },
    appId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the "url" model
const Url = mongoose.model("Url", urlSchema);

// Export the model
module.exports = Url;