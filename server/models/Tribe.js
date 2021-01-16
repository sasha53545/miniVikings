const {Schema, model} = require('mongoose');

const tribeSchema = new Schema({
    name: {type: String, required: true},
});

module.exports = model('Tribe', tribeSchema);
