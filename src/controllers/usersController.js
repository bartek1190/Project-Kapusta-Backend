const User = require("../schemas/userSchema");

const register = async (body) => {
  try {
    if (body.email) body.email = body.email.toLowerCase();
    const user = await User.findOne({ email: body.email });
    if (user) {
      return 409;
    }
    const newUser = new User({
      email: body.email,
    });
    newUser.setPassword(body.password);
    await newUser.save();
    return newUser;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

module.exports = { register };
