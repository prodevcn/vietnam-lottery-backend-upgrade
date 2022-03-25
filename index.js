require('dotenv').config();
require('./src/helpers/DatabaseConnection');

const express = require('express');
const logger = require('morgan');
const passport = require('passport');
const http = require('http');
const session = require('express-session');
// const https = require('https');
// const fs = require('fs');
const { Server } = require('socket.io');
const socketEvents = require('./src/helpers/SocketEvents');
const conf = require('./src/configs');
const routes = require('./src/routes');
const {
  startNorthernLotteryService,
} = require('./src/services/northern/northern');

// const options = {
//   key: fs.readFileSync('/var/www/lotopoka/lotopoka.com.key'),
//   cert: fs.readFileSync('/var/www/lotopoka/lotopoka.com.crt'),
//   ca: fs.readFileSync('/var/www/lotopoka/lotopoka.com.chained.crt')
// }

const app = express();

const corsOptions = {
  allRoutes: true,
  origin: '*',
  methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
  headers: 'Origin, X-Requested-With, Content-Type, Accept, Engaged-Auth-Token',
  credentials: true,
};

// app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.use(express.json({ limit: '50mb' }));
app.use(logger('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Origin',
    'Origin, X-Request-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(
  session({ secret: conf.secret, resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

require('./src/configs/passport')(passport);

routes(app);

const server = http.createServer(app);
// const server = https.createServer(options, app);

const io = new Server(server, { cors: corsOptions });
socketEvents(io);

server.listen(conf.port, '0.0.0.0', () => {
  console.log(`[SERVER]: start server at port ${conf.port}`);
});

/**
 * run sub game services
 */

startNorthernLotteryService(io);

module.exports = server;
