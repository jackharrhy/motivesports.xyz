require('dotenv').config();

const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const cors = require('cors')

const services = require('./services');

const port = process.env.PORT || 4334;
const app = express(feathers());

app.use(cors({
  credentials: true,
  origin: true,
}));

app.configure(socketio());
app.configure(express.rest());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

services(app);

app.listen(port).on('listening', () =>
  console.log(`server listening on localhost:${port}`)
);
