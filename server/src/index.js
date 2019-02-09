require('dotenv').config();

const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const cors = require('cors')
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const port = process.env.PORT || 4334;
const clientDir = process.env.CLIENT_DIR || __dirname;

const app = express(feathers());

const adapter = new FileSync('data/db.json')
const db = low(adapter);

db.defaults({
  teams: {},
  matches: [],
}).write();

app.use(cors({
  credentials: true,
  origin: true,
}));

app.configure(socketio());
app.configure(express.rest());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.errorHandler());

const matchesService = {
  async find(params) {
    return db.get('matches').value();
  },
  async create(data, params) {
    console.log(data, params);
  },
};
app.use('/api/matches', matchesService);

const teamsService = {
  async find(params) {
    return db.get('teams').value();
  },
  async create(data, params) {
    console.log(data, params);
  },
};
app.use('/api/teams', teamsService);

app.use('/', express.static(path.resolve(clientDir)));

app.on('connection', (connection) => app.channel('everybody').join(connection));
app.publish((data) => app.channel('everybody'));

app.listen(port).on('listening', () =>
  console.log(`server listening on localhost:${port}`)
);
