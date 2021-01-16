const {Schema, model} = require('mongoose');

const boardSchema = new Schema({
    name: {type: String, required: true},
    age: {type: String, required: true},
    profession: {type: String, required: true,},
    tribe: {type: String, required: true},
    icon: {type: String, required: true},
    deleted: {type: Boolean, required: true},
});

module.exports = model('Board', boardSchema);
