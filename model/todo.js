const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    todoName:{
        type:String,
    },
    tasks:[
        {
          type:mongoose.Schema.ObjectId,
          ref:'Task'
        }
    ]

})


const Todo = mongoose.model('Todo' ,  TodoSchema);
module.exports = Todo ; 



