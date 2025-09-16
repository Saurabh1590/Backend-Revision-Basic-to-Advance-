import express from "express";
import userRouter from "./routers/user.routes.js";

const app = express();

const PORT = 8081;

app.use("/api/v1/users",userRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
