var mongoose = require('mongoose');

// Create Todos schema
var TasksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    done: {
    	type: Boolean,
    	default: false
    },
    deadline: {
    	type: Date,
    	default: Date.now
    }
});


// Export schema
module.exports = TasksSchema;