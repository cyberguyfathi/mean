const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');

const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password')),
  roles: Joi.array().items(Joi.string().valid('admin', 'analyst'))
})


module.exports = {
  insert,
  get
}

User.findOne({email: 'admin@mean.com'}).then((user) => {
  if (user && user.roles.indexOf("admin") > -1) {
    console.log("Found admin user");
    return;
  }
  console.log("Couldn't find admin user");
  insert({
    fullname: "Admin",
    email: "admin@mean.com",
    password: "admin",
    repeatPassword: "admin",
    roles: ["admin"]
  });
})

async function insert(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}

async function get() {
  return await User.find();
}
