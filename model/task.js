const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
    },
    todoId:{
        type:mongoose.Schema.ObjectId,
        ref:'Todo',
    },
    name:{
        type:String,
    },
    isChecked:{
        type:Boolean,
        default:false,
    
    },
    Date:{
        type:String,
    },
})

const Task = mongoose.model('Task' , TaskSchema);

module.exports = Task;
