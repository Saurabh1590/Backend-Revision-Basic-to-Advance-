import crypto from "crypto";

export const generateToken = () => {
  return crypto.randomBytes(16).toString("hex");
}

export const validateToken = (token) => {
  return typeof token === "string" && token.length === 32; // Example validation
}