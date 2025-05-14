import dotenv from "dotenv";
dotenv.config(); 

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const existingUser = await User.findOne({ oauthId: profile.id, oauthProvider: "google" });

//         if (existingUser) return done(null, existingUser);

//         const newUser = await User.create({
//           username: profile.emails[0].value.split("@")[0],
//           email: profile.emails[0].value,
//           fullname: profile.displayName,
//           oauthProvider: "google",
//           oauthId: profile.id,
//         });

//         return done(null, newUser);
//       } catch (err) {
//         return done(err, null);
//       }
//     }
//   )
// );

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ email: profile.emails[0].value });

        if (existingUser) {
          return done(null, existingUser); 
        }

        const newUser = await User.create({
          username: profile.displayName.toLowerCase().replace(/\s/g, ''),
          email: profile.emails[0].value,
          fullname: profile.displayName,
          oauthProvider: "google",
          oauthId: profile.id,
        });

        return done(null, newUser);
      } catch (err) {
        return done(err, null);
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
  } catch (err) {
    done(err, null);
  }
});
