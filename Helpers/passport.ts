import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import config from "./config";
import { register, socialRegister } from "../Models/register";
var User = require("mongoose").model("User");
var FacebookTokenStrategy = require("passport-facebook-token");
var GoogleTokenStrategy = require("passport-google-token").Strategy;

passport.serializeUser((user: any, done: Function) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done: Function) => {
  let user = await register.findById(id);
  if (user) done(null, user);
  else done(null, false);
});

passport.use(
  "login",
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true, // allows us to pass back the entire request to the callback
    },
    async (req: any, email: string, password: string, done: Function) => {
      try {
        /* FETCHING USER */
        console.log("nhhhhhhhhhhhhhhh==+<.", email, password);
        const user: any = await register.findOne({ email: email });

        console.log("user=========+>", user.password===password);
        if (!user) return done(null, false, { error: "Invalid username or password" });

        /* VERIFYING PASSWORD */
        const verified = bcrypt.compareSync(password, user.password);
        console.log("verified====+>", verified);
        if (!verified) {
          return done(null, false, { error: "Invalid username or password" });
        } else {
          return done(null, user);
        }
      } catch (err) {
        console.log("error in passport login strategy", err);
        return done(err, false);
      }
    }
  )
);

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: config.facebookAuth.clientID,
      clientSecret: config.facebookAuth.clientSecret,
    },
    function (accessToken: any, refreshToken: any, profile: any, done: any) {
      User.upsertFbUser(
        accessToken,
        refreshToken,
        profile,
        function (err: any, user: any) {
          return done(err, user);
        }
      );
    }
  )
);

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: config.googleAuth.clientID,
      clientSecret: config.googleAuth.clientSecret,
    },
    function (accessToken: any, refreshToken: any, profile: any, done: any) {
      User.upsertGoogleUser(
        accessToken,
        refreshToken,
        profile,
        function (err: any, user: AnalyserOptions) {
          return done(err, user);
        }
      );
    }
  )
);

export default passport;
