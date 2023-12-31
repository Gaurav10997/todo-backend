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
    res.status(400).json({
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

app.patch("/update-task-by-todo/:taskId", async (req, res) => {
  try {
    console.log(req.body)
    const {taskId} = req.params;
    const updatedTask = await Task.findOneAndUpdate({
     _id:taskId,
    },
      req.body,
      {
        new:true,lean: true
      }
    )
    console.log(updatedTask)
    res.status(200).json({
      status:"Successfull",
      updatedTask,
    })

  } catch (err) {
    res.status(200).json({
      message: "Something went wrong",
      err: err.message,
    });
  }
});

app.delete('/delete-task-by-todo/:taskId',async(req,res)=>{
  try{
    const {taskId} = req.params;
    console.log("jkhfhjsa")
    const deletetask = await Task.findOneAndDelete({
      _id:taskId,
    })

    res.status(204).json({
      status:"success",
      deletetask
    })

  }catch(err){
    res.status(400).json({
      status:"failure",
      message:"something went very wrong"
    })

  }
})



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


app.patch("/update-todo", async (req, res) => {
  try {
    const { userId } = req.body;
    const {todoId} = req.body
    const { todoName } = req.body;
    const todo = await Todo.findOneAndUpdate({
      userId,
      _id:todoId,
    },
    {todoName},
    { new: true }
    ).populate('tasks');

    if(!todo){
      throw new Error('SomeThing went Wrong')
    }

    res.status(201).json({
      status: "Success",
      message: "Todo Updated successfully ",
      todo,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});



app.delete("/delete-todo", async (req, res) => {
  try {
    const { userId } = req.body;
    const {todoId} = req.body
    const todo = await Todo.findOneAndDelete({
      userId,
      _id: todoId,
    });
    
    if(!todo){
      throw new Error('SomeThing went Wrong')
    }

    res.status(204).json({
      status: "Success",
      message: "Todo Updated successfully ",
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


app.listen(9090, () => {
  console.log("server Started Sucessfully");
});
