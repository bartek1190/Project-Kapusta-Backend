const { register } = require("../../controllers/usersController");

const userSignup = async (req, res) => {
  try {
    const body = {
      email: req.body.email,
      password: req.body.password,
    };
    const result = await register(body);
    console.log(result);
    if (result && result !== 409) {
      return res.status(201).json({
        status: "success",
        code: 201,
        data: {
          user: {
            email: result.email,
          },
        },
      });
    }
    if (result === 409) {
      return res.status(409).json({
        status: "failure",
        code: 409,
        message: "Email already in use",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: "failure",
      code: 500,
      message: err.message,
    });
  }
};

module.exports = {
  userSignup,
};
