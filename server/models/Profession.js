const {Schema, model} = require('mongoose');

const professionSchema = new Schema({
    name: {type: String, required: true},
});

module.exports = model('Profession', professionSchema);
