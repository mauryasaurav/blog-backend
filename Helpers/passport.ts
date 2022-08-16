import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import { register } from "../Models/register";

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
        const user: any = await register.findOne({ email: email });

        if (!user) return done(null, false, { error: "Invalid username or password" });

        /* VERIFYING PASSWORD */
        const verified = bcrypt.compareSync(password, user.password);
        if (!verified) done(null, false, { error: "Invalid username or password" });
        return done(null, user);
      } catch (err) {
        console.log("error in passport login strategy", err);
        return done(err, false);
      }
    }
  )
);

export default passport;
