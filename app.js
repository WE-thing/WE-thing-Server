var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const http = require("http");
const socketIO = require("socket.io");
const moment = require("moment");

const dotenv = require("dotenv");
const mongoose = require("mongoose");

// .env 읽고 환경설정
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
    console.log("MongoDB Connection Error");
  });

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

var indexRouter = require("./routes/api/index");
const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

app.get("/", function (req, res) {
  // console.log(req);
  // console.log(req.headers);
  res.send("Hello World!");
});

const server = http.createServer(app).listen(3001);
const io = socketIO(server);

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    socket.emit("message", message);
    console.log("hello............");
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
