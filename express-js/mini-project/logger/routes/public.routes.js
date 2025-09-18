import express from "express";
import { generateToken } from "../utils/token-utils.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Hello from public route");
});

router.get("/generate-token", (req, res) => {
  const token = generateToken();
  res.status(200).send({
    message: "Token generated successfully",
    token: token,
  });
});

export default router;
