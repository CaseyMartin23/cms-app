const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const queryUsers = require("../../db/queries/users");

const authenticateUser = async (jwt_payload, done) => {
  try {
    const [userWithId] = await queryUsers.getById(jwt_payload.sub);

    if (userWithId) {
      return done(null, userWithId);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
};

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PUB_KEY.replace(/\\n/g, "\n"),
  algorithms: ["RS256"],
};

module.exports = (passport) => {
  passport.use(new JwtStrategy(options, authenticateUser));
};
