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
          user = await User.findOne({ email: emails[0].value });
          const firstLetter = emails[0].value[0].toUpperCase();
          const avatarUrl = `https://ui-avatars.com/api/?name=${firstLetter}&background=random&size=128`;
          if (!user) {
            user = new User({
              googleId: id,
              email: emails[0].value,
              avatarUrl: avatarUrl,
            });
          } else {
            user.googleId = id;
          }
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        user.token = token;
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
