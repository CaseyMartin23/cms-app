const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const queryUsers = require("../../db/queries/users");

const initializePassport = (passport) => {
  const authenticateUser = async (email, password, done) => {
    const [userWithEmail] = await queryUsers.getByEmail(email);
    if (userWithEmail === null || userWithEmail === undefined) {
      return done(null, false, { message: "User not found" });
    }
    try {
      if (await bcrypt.compare(password, userWithEmail.password)) {
        return done(null, userWithEmail);
      } else {
        return done(null, false, { message: "Incorrect email or password" });
      }
    } catch (err) {
      return done(err);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    const [userWithId] = await queryUsers.getById(id);
    return done(null, userWithId);
  });
};

module.exports = initializePassport;
