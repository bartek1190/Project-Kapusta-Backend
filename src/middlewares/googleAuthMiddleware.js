const dotenv = require("dotenv");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/userModel");

dotenv.config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
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
