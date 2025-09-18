import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logMiddleware = (req, res, next) => {
  const logMessage = `${new Date().toISOString()} - ${req.method} ${
    req.url
  }\n`;
  const logFile = path.join(__dirname, "../logs", "requests.log");
  fs.appendFile(logFile, logMessage, (err) => {
    if (err) {
      console.error("Failed to write log:", err);
    }
    next();
  });
};
export default logMiddleware;