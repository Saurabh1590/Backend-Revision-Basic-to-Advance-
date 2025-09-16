import { Router } from "express";

const userRouter = Router();

userRouter.post("/create-user", (req, res) => {
  res.status(200).send("User created successfully");
});

userRouter.get("/get-user", (req, res) => {
  res.status(200).send("User data");
});

userRouter.delete("/delete-user", (req, res) => {
  res.status(200).send("User deleted successfully");
});


export default userRouter;