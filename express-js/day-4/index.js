import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("Session: ", req.session);
  console.log("Session id: ", req.session.id);
  res.send("Hello, World!");
});

app.get("/login", (req, res) => {
  req.session.user = {
    username: "john_doe",
    email: "john@gmail.com",
  };
  res.send(`User logged in: ${req.session.user.username}`);
});

app.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {  
      return res.status(500).send("Error logging out");
    }   
  });
}); 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
