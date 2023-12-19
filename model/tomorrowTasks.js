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
    ishighlight:{
        type:Boolean,
        default:false
    },
    Date: {
        type: String,
        default: function() {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow.toLocaleDateString(); // Or use toISOString() for a standard date format
          }
    },
})

TaskSchema.pre('save', async function (next) {
    try {
      if (this.userId) {
        const Todo = mongoose.model('Todo');
        const temp = await Todo.findOneAndUpdate(
            { userId: this.userId , _id:this.todoId}, 
            { $addToSet: { tasks: this._id } },
            { new: true }
          );
        next();
      } else {
        throw new Error('User ID not provided'); 
      }
    } catch (err) {
      next(new Error('Failed to update Agent with customer ID'));
    }
  });

  const TomorrowTask = mongoose.model('TomorrowTask' , TaskSchema);

module.exports = TomorrowTask;
