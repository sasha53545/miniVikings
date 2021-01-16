const {Schema, model} = require('mongoose');

const taskSchema = new Schema({
    title: {type: String, required: true},
    boardId: {type: String, required: true},
    description: {type: String, required: true},
    parentTaskId: {type: String, required: true},
});

module.exports = model('Task', taskSchema);
