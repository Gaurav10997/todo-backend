const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    todoName:{
        type:String,
    },
    todayTasks:[
        {
          type:mongoose.Schema.ObjectId,
          ref:'Task'
        }
    ],
    tomorrowTasks:[
        {
          type:mongoose.Schema.ObjectId,
          ref:'TomorrowTask'
        }
    ]

})


const Todo = mongoose.model('Todo' ,  TodoSchema);
module.exports = Todo ; 



