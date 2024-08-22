const mongoose = require('mongoose');
const Item = require('./model/prod'); // Adjust the path accordingly
const items = require('./item'); // Adjust the path accordingly

mongoose.connect('mongodb+srv://alishah03028796:Sasra03028796131@cluster0.uvfiyyq.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    
    // Insert the items into the database
    Item.insertMany(items)
        .then(() => {
            console.log('Items have been inserted successfully');
            mongoose.connection.close(); // Close the connection after the operation
        })
        .catch(err => {
            console.error('Error inserting items:', err);
        });

}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});
