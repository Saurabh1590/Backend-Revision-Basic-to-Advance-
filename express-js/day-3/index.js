import cookieParser from "cookie-parser";
import express from "express";

const app = express();
const PORT = 3000;

app.use(cookieParser());

app.get("/", (req, res) => {
  res.cookie("name", "express", {
    maxAge: 1000 * 60 * 60 * 24,
  });
  res.send("Hello World!");
});

app.get("/product", (req, res) => {
  if (req.cookies.name && req.cookies.name == "express") {
    res.send({
      id: 1,
      item: "car",
      price: 20,
    });
  }

  res.status(403).send("Unauthorized: Not have permission to access");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
