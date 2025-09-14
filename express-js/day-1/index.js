import express from "express";
import userData from "./data/data.js";

const app = express();
app.use(express.json());

const PORT = 8080;

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/api/v1/users", (req, res) => {
  const { name } = req.query;

  if (name) {
    const user = userData.filter((user) => {
      return user.name === name;
    });
    res.status(200).send(user);
  }
  res.status(200).send(userData);
});

app.get("/api/v1/users/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  const parseId = parseInt(id);

  const user = userData.find((user) => user.id === parseId);
  res.send(user);
});

app.post("/api/v1/users", (req, res) => {
  const { name, displayName } = req.body;

  const newUser = {
    id: userData.length + 1,
    name,
    displayName,
  };

  userData.push(newUser);
  res.status(201).send({
    message: "User created successfully",
    data: newUser,
  });
});

// *3. PUT Request ( UPDATE ALL FIELDS);

app.put("/api/v1/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  const userIndex = userData.findIndex((user) => user.id === parsedId);

  if (userIndex === -1) {
    res.status(404).send("User Not Found");
  }

  userData[userIndex] = {
    id: parsedId,
    ...body,
  };

  res.status(201).send({
    message: "User Updated",
    data: userData[userIndex],
  });
});

// *4. PATCH Request ( UPDATE SPECIFIC FIELD)
app.patch("/api/v1/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  const userIndex = userData.findIndex((user) => user.id === parsedId);

  if (userIndex === -1) {
    res.status(404).send("User Not Found");
  }

  userData[userIndex] = {
    ...userData[userIndex],
    ...body,
  };

  res.status(201).send({
    message: "User Updated",
    data: userData[userIndex],
  });
});

// *5. DELETE Request ( it is for deleting data on server)
app.delete("/api/v1/users/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  const userIndex = userData.findIndex((user) => user.id === parsedId);
  if (userIndex === -1) {
    res.status(404).send("User Not Found");
  }
  userData.splice(userIndex, 1);
  res.status(200).send({
    message: "User Deleted",
    data: userData,
  });
});

app.listen(PORT, (req, res) => {
  console.log(`Server is working at ${PORT}`);
});
