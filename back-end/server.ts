const express = require("express");
const path = require("path");
const app = express();
const signInSignUpRoutes = require("./routes/signInAndSignUpRoutes");

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "/../front-end/build")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(signInSignUpRoutes);

app.get("*", (req: any, res: any) =>
  res.sendFile(path.resolve(__dirname + "/../front-end/build/index.html"))
);

app.listen(port, () => console.log(`Server is Listening on port: ${port}...`));
