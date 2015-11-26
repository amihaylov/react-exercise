var mongoose = require('mongoose');
var TasksSchema = require('./tasksSchema');

// Create Lists schema
var ListsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tasks: [TasksSchema]
});


// Export schema
module.exports = mongoose.model('List',ListsSchema);