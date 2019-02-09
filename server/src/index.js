require('dotenv').config();

const cors = require('cors')
const express = require('express');
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const port = process.env.PORT || 4334;
const clientDir = process.env.CLIENT_DIR || __dirname;

const app = express();

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

const sendObject = (res, obj) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(obj));
};

app.get('/api/teams', (req, res) => {
  sendObject(res, db.get('teams').value());
});

app.get('/api/matches', (req, res) => {
  sendObject(res, db.get('matches').value());
});

app.use('/', express.static(path.resolve(clientDir)));

app.listen(port);
