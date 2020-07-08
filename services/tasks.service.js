const environment = require('dotenv').config()
const Task = require('../api/tasks/tasks.model').Task
const User = require('../api/users/users.model').User
 
 
// Create New task
async function create(taskParam){
    let task = new Task(taskParam);

    // check if passed userid is valid
    if (!await User.findById(taskParam.user_id)) {
         return {"message":"User does not exist"};
    }

    // Save task
    await task.save();

    return task;
}


// Get All tasks
async function getAll() {
    return await Task.find({});
}


// Get One task
async function getOne(_id) {
    return Task.findById(_id);
}


// Update a task
async function update(id, taskParam) {
    let task = await Task.findById(id);
     
    if (!task) throw 'task not Found';
     
    Object.assign(task, taskParam);
    await task.save();
    return Task.findById(id);
}

// Delete a task
async function _delete(id) {
    await Task.deleteOne({_id: id});
}

// Delete all tasks
async function deleteAll() {
    return await Task.remove({});
}


// Get tasks of a specific user
 
async function getByUser (id){
    return await Task.find({user_id: id});
}

// export all of those functions in order to access them outside of this file
module.exports = { create, getAll, getOne, update, delete: _delete, deleteAll, getByUser};
