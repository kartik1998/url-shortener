const crypto = require("crypto");

/**
 * Generates a SHA-256 hash of a given string.
 * @param {string} input - The string to be hashed.
 * @returns {string} - The SHA-256 hash of the input string.
 */
function generateSHA256Hash(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

/**
 * Generates a random string of a specified length.
 * @param {number} length - The length of the random string.
 * @returns {string} - A random alphanumeric string of the given length.
 */
function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

// Export the utility functions
module.exports = { generateSHA256Hash, generateRandomString };