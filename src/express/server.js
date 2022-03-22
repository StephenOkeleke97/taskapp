const express = require("express");
const session = require("express-session");
const main = require("./entry");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const bodyParser = require("body-parser");
const { User } = require("./schema/schema");
const cors = require("cors");

const app = express();
const TWO_HOURS = 1000 * 60 * 60 * 2;
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
};

const {
  PORT = 5100,

  SESS_LIFETIME = TWO_HOURS,
  SESS_NAME = "sid",
  SESS_SECRET = "secretkey",
} = process.env;

const client = connectDB().catch((error) => {
  console.log(error);
});

async function connectDB() {
  await mongoose.connect(
    "mongodb+srv://user:password123$" +
      "@chatdb.qj8op.mongodb.net/chatDB?retryWrites=true&w=majority"
  );
  console.log("Connected to database");
  return mongoose.connection.getClient();
}

async function findUser(username, password) {
  if (!password) {
    const user = await User.findOne({
      username: username,
    });
    return user;
  }
  const user = await User.findOne({
    username: username,
    password: password,
  });
  return user;
}

async function addUser(username, password) {
  const user = new User({ username: username, password: password });
  await user.save();
}

const redirectHome = (req, res, next) => {
  if (req.session.userId) {
    res.redirect("/home");
  } else {
    next();
  }
};

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(cors(corsOptions));

app.set("trust proxy", 1);
app.use(
  session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    store: MongoStore.create({
      client,
      dbName: "chatDB",
      touchAfter: 1 * 3600,
    }),
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
      secure: false,
    },
  })
);

app.use("/api", main);

app.post("/loggedin", (req, res) => {
    if (req.session.userId) {
        const user = User.findById(req.session.userId);
        user.then((result) => {
            if (result) res.send(result);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
        return;
    }
    res.sendStatus(401);
})

app.post("/login", redirectHome, (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const user = findUser(username, password);
    user
      .then((result) => {
        if (result) {
          req.session.userId = result._id;
          res.sendStatus(200);
        } else {
          res.status(401).send("Invalid username or password");
        }
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
    return;
  }
  res.sendStatus(401);
});

app.post("/register", redirectHome, (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const user = findUser(username);
    user.then((result) => {
      if (result) {
        res.status(400).send("Username is taken");
      } else {
        addUser(username, password)
          .then((result) => {
            res.status(200).send("Success");
          })
          .catch((error) => {
            console.log(error);
            res.sendStatus(500);
          });
      }
    });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) res.clearCookie(SESS_NAME);
    res.send("Success");
  });
});

app.listen(PORT, () => {
  console.log("App listening on port", PORT);
});
