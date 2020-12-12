const router = require("express").Router();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const queryUsers = require("../../db/queries/users");

router.post("/register", async (req, res) => {
  const userRegisterInfo = req.body;
  try {
    const hashedPassword = await bcrypt.hash(userRegisterInfo.password, 10);

    const [userExists] = await queryUsers.getByEmail(userRegisterInfo.email);

    if (userExists) {
      console.log("userExists->", userExists);
      throw new Error("User Already exists");
    } else {
      await queryUsers
        .createUser({ ...userRegisterInfo, password: hashedPassword })
        .then((resp) => {
          res.status(200).json(resp);
        });
    }
  } catch (err) {
    console.error(err);
    res.send(JSON.stringify({ error: err.message, registered: false }));
  }
});

router.post("/login", async (req, res, next) => {
  const loginInfo = req.body;
  try {
    const [userWithEmail] = await queryUsers.getByEmail(loginInfo.email);

    if (userWithEmail === undefined) {
      return res
        .status(401)
        .json({ success: false, msg: "Couldn't find user by that email" });
    }

    if (await bcrypt.compare(loginInfo.password, userWithEmail.password)) {
      const payload = { sub: userWithEmail.id, iat: Date.now() };
      const PRIV_KEY = process.env.PRIV_KEY.replace(/\\n/g, "\n");
      const user = {
        id: userWithEmail.id,
        email: userWithEmail.email,
      };
      const token = jsonwebtoken.sign(payload, PRIV_KEY, {
        expiresIn: "1d",
        algorithm: "RS256",
      });

      return res
        .status(200)
        .json({ success: true, auth_user: { user, token } });
    } else {
      return res
        .status(401)
        .json({ success: false, msg: "Incorrect password/email" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
