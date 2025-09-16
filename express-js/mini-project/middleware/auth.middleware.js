import { validateToken } from "../utils/token-utils.js";

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (token && validateToken(token)) {
        res.user = {name: "saurabh", id:1}; // Example user data
        next();
    } else {
        res.status(401).send({ message: "Unauthorized: invalid or missing token" });
    }
}

export default authMiddleware;