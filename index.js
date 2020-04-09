/* PACKAGES IMPORTS */

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logger = require("morgan");
const socketIO = require("socket.io");
const http = require("http");
const passport = require("passport");

/* LOCAL IMPORTS */
const WSS = require("./broadcast");

var {
  mongoose
} = require("./db/mongoose");
var {
  User
} = require("./models/user");
const {
  secret
} = require("./config/config");
var userRoutes = require("./routes/user");
var imageRoutes = require("./routes/userImage");
var keyRoutes = require("./routes/key");
var faqRoutes = require("./routes/faq");
var downloadRoutes = require("./routes/download");
var uploadRoutes = require("./routes/upload");
const port = process.env.PORT || 3000;

/* SERVER SETUP */

var app = express();


/* SOCKET.IO SETUP */

var io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("broadcastThisMessage", (message) => {
    console.log("Message to be broadcasted: ", message);

    socket.broadcast.emit("newMessage", message);
  });
});

/* APP CONFIGS */

app.use((req, res, next) => {
  // console.log(req);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Headers", "*");
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-auth"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

/* Express session midleware */

app.use(
  session({
    secret,
    resave: true,
    saveUninitialized: true,
  })
);

/* PASSPORT MIDDLEWARE */

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  console.log(user);
  cb(null, user);
  // User.findById(user.id, function(err, user) {
  // cb(err, user);
  // });
});

/* PASSPORT STRATEGIES */

var {
  Local
} = require("./passport/local");
require("./passport/facebook");
require("./passport/google");

/* ROUTES */

var userRoutes = require("./routes/user");
var requestsRoute = require("./routes/requests");

app.use("/api/request", requestsRoute);
app.use("/api/user", userRoutes);
app.use("/api/image", imageRoutes);
app.use("/api/key", keyRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/downloads", downloadRoutes);
app.use("/api/uploads", uploadRoutes);
app.get("/api/", (req, res) => res.send("Hello Moto...!"));
app.get("/api/:file", function (req, res) {
  var file = req.params.file;
  console.log(req.params.file);
  if (req.params.file == "register") {
    res.sendFile("register.html", {
      root: __dirname,
    });
  } else if (req.params.file == "login") {
    res.sendFile("login.html", {
      root: __dirname,
    });
  } else if (req.params.file == "broadcast") {
    res.sendFile("websocket.html", {
      root: __dirname,
    });
  } else {
    res.sendFile("uploads/" + req.params.file, {
      root: __dirname,
    });
  }
});
// one server vue thing
// static folder
app.use(express.static(__dirname + '/publicVue/'));
// handle SPA
app.get(/.*/, (req, res) => {
  res.sendFile(__dirname + '/publicVue/index.html')
})

// server
var server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});