import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../model/user.js";

passport.use(
  new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { mesage: "Invalid password" });
        }
        return done(null, user, { message: "User logged in successfully" });
      } catch (error) {
        return done(error);
      }

  })
);

passport.serializeUser ((user, done) =>{
    console.log("User has been serialized");
    done (null, user._id);
});
passport.deserializeUser (async(_id, done) =>{
    try {
        console.log("User has been deserialized");
        const user = await User.findById(_id);
        done(null, user);
        
    } catch (error) {
        done(error);
        
    }
    
});




