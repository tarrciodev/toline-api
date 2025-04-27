import crypto from "crypto";

// Function to generate a 20-character token
export function generateToken(length = 20) {
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString("hex") // Convert to hexadecimal format
        .slice(0, length); // Trim to the desired length
}
