const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const cors = require ("cors")
const config = require("./config/globalEnviroment.js")



require("./db.js");
// console.log(config.URL);

const app = express();

app.use(cors());

const server = require("http").Server(app);
const socketio = require("socket.io")(server,{
  cors:{
    // origin: config.URL || "https://c13-13-n-node-react-git-dev-tellmechat.vercel.app",
    origin: "*",
    methods: ["GET", "POST"],
  }
});

require("./config/socket.js")(socketio);

app.name = "API";

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req, res, next) => {
  //Al deployar se cambia esta línea por la de abajo
  res.header("Access-Control-Allow-Origin", "*");
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from

  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Authorization, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/", routes);

// Error catching endware.
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
