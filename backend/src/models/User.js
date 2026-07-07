// User model — authenticated users who create/manage short links
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
<<<<<<< HEAD
    name: { type: String, required:true },
    email: { type: String,required:true, unique: true },
    password: { type: String , required:true, minlength: 6 },
=======
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
>>>>>>> df3686a1f13df9eb097890139fab6eafd81e6e28
  },
  { timestamps: true }
);


module.exports = mongoose.model('User', userSchema);
