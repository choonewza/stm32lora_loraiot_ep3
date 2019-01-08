const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");

const keys = require("./config/keys");

//Services
require("./services/mongoose");
require("./services/passport");

const app = express();

if (process.env.NODE_ENV == "production") {
  app.use(compression());
} else {
  app.use(morgan("dev"));
}

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

//Routes
require("./routes/authRoutes")(app);
require("./routes/loraiotRoutes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
  console.log(`Server Running at http://localhost:${PORT}`);
});
