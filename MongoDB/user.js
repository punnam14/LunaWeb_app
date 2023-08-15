const mongoose = require('mongoose');
const connectDB = require('./modules/db');

connectDB(true);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
  
const User = mongoose.model('User', userSchema);
  
const newUser = new User(regUser);
newUser.save()
.then((savedUser) => {
    console.log('Data has been sucessfully saved:', savedUser);
    // Disconnect from the database
    connectDB(false);
})
.catch(error => {
    console.error('Failed to save user:', error);
    // Disconnect from the database in case of error
    connectDB(false);
});