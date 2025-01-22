const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb+srv://user_01:admin@testcluster.ocbnhd1.mongodb.net/todos");

// Define todo schema
const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

// Create todo model
const todo = mongoose.model('todo', todoSchema);

module.exports = {
    todo
};
