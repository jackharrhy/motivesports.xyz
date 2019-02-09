require('dotenv').config();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const cors = require('cors')
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 4334;
const clientDir = process.env.CLIENT_DIR || __dirname;

const adapter = new FileSync('data/db.json')
const db = low(adapter);

db.defaults({
    teams: {},
    matches: [],
}).write();

app.use(cors({credentials: true, origin: true}));

app.get('/api/teams', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(db.get('teams').value()));
});

app.get('/api/matches', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(db.get('matches').value()));
});

app.use('/', express.static(path.resolve(clientDir)));

app.listen(port);
