const express = require("express");
const app = express();
const Todo = require("./model/todo");
const mongoose = require("mongoose");
const User = require("./model/user");
const Task = require("./model/task");
const cors = require('cors');

mongoose.connect(
  "mongodb+srv://todo:todo@cluster0.ivt8brg.mongodb.net/?retryWrites=true&w=majority"
);



const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      message: "testing",
    });
  } catch (err) {
    res.status(404).json({
      status: "success",
      message: "tested",
    });
  }
});


app.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "successfull",
      message: "user created Succesfully",
      user,
    });
  } catch (err) {
    res.status(201).json({
      status: "failure",
      message: err.message,
    });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please Provide Email and Password");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("user Not found ");
    }
    if (user.password !== password) {
      throw new Error("Password is wrong");
    }

    res.status(200).json({
      status: "Success",
      message: "Login SuccessFull",
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: err.message,
    });
  }
});

app.post("/post-task-by-todo", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({
      message: "success",
      task,
    });
  } catch (err) {
    res.status(200).json({
      message: "Something went wrong",
      err: err.message,
    });
  }
});

app.post("/post-todo", async (req, res) => {
  try {
    const { userId } = req.body;
    const { todoName } = req.body;
    const todo = await Todo.create({
      userId,
      todoName,
    });
    res.status(201).json({
      status: "Success",
      message: "Todo created successfully ",
      todo,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "something went wrong",
    });
  }
});




app.get("/get-all-todos/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const todo = await Todo.find({ userId: userId }).populate('tasks')

    res.status(200).json({
      status: "success",
      todo,
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: err.message,
    });
  }
});


app.listen(200, () => {
  console.log("server Started Sucessfully");
});
