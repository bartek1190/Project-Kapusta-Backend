const dotenv = require("dotenv");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
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
        let user = await User.findOne({ email: emails[0].value });
        const avatarUrl = `https://ui-avatars.com/api/?name=${emails[0].value[0].toUpperCase()}&background=random&size=128`;

        if (!user) {
          user = new User({
            googleId: id,
            email: emails[0].value,
            avatarUrl: avatarUrl,
          });
        } else {
          // Ensure the googleId is updated for existing users
          user.googleId = id;
        }

        // Generate and assign a token regardless of new or existing user
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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
