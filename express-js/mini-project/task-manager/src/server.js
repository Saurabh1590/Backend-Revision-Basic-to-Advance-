import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";   // 🔹 needed for reading cookies
import authRoute from "./routes/auth.routes.js";
import taskRoute from "./routes/task.routes.js";

const app = express();
const port = 3000;

// Global Middleware
app.use(express.json());
app.use(cookieParser());   // 🔹 enable cookie parsing

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // ⚠️ set true only if using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// 🔹 Auto re-login middleware
app.use((req, res, next) => {
  if (!req.session.user && req.cookies.username) {
    req.session.user = { username: req.cookies.username };
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to task manager API 📝");
});

app.use("/auth", authRoute);
app.use("/task", taskRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
