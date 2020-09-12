const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "/../front-end/build")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

app.get("*", (req: any, res: any) =>
  res.sendFile(path.resolve(__dirname + "/../front-end/build/index.html"))
);

router.post("/signIn", (req: any, res: any) => {
  const userInfo = { ...req.body };
  if (userInfo) {
    console.log("userInfo->>", userInfo);
    res.redirect("/");
  }
});

router.post("/signUp", (req: any, res: any) => {
  const userInfo = { ...req.body };
  console.log("userInfo->>", userInfo);
});

app.listen(port, () => console.log(`Server is Listening on port: ${port}...`));
