const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const dotenv = require("dotenv");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const { id, emails } = profile;
      try {
        let user = await User.findOne({ googleId: id });
        if (!user) {
          // If user doesn't exist by Google ID, check by email as a fallback
          user = await User.findOne({ email: emails[0].value });
          if (!user) {
            // User doesn't exist by email, create a new user
            user = new User({
              googleId: id,
              email: emails[0].value,
              // Set other fields as needed
            });
          } else {
            // User exists by email, add Google ID to existing account
            user.googleId = id;
          }
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        user.token = token;
        // For existing users found by Google ID, you can update details if necessary here
        await user.save();
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
