import { readTasks, writeTasks } from "../utils/task.utils.js";

export const getAllTasks = async (req, res) => {
  if (!req.session || !req.session.user) {
    return res
      .status(401)
      .send({ message: "Unauthorized: Please login to access this resource" });
  }
  const tasks = await readTasks();
  res.json(tasks.filter((task) => task.username === req.session.user.username));
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .send({ message: "Title and description are required" });
  }
  const tasks = await readTasks();
  const newTask = {
    id: Date.now(),
    title,
    description,
    username: req.session.user.username,
    completed: false,
  };
  tasks.push(newTask);
  await writeTasks(tasks);
  res.status(201).send({ message: "Task created successfully", task: newTask });
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const tasks = await readTasks();
  const taskIndex = tasks.findIndex(
    (task) => task.id === parseInt(id) && task.username === req.session.user.username
  );

  if (taskIndex === -1) {
    return res.status(404).send({ message: "Task not found" });
  }

  if (title !== undefined) tasks[taskIndex].title = title;
  if (description !== undefined) tasks[taskIndex].description = description;
  if (completed !== undefined) tasks[taskIndex].completed = completed;

  await writeTasks(tasks);

  res.send({ message: "Task updated successfully", task: tasks[taskIndex] });
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const tasks = await readTasks();
  const taskIndex = tasks.findIndex(
    (task) => task.id === parseInt(id) && task.username === req.session.user.username
  );

  if (taskIndex === -1) {
    return res.status(404).send({ message: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  await writeTasks(tasks);
  res.send({ message: "Task deleted successfully" });
};

