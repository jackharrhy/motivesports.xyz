const express = require('@feathersjs/express');
const uuid4 = require('uuid/v4')
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const {
  BadRequest,
} = require('@feathersjs/errors');

const validatorFacotry = require('./validator');

const clientDir = process.env.CLIENT_DIR || __dirname;

const adapter = new FileSync('data/db.json')
const db = low(adapter);

db.defaults({
  teams: {},
  matches: {},
}).write();

module.exports = async (app) => {
  const validate = await validatorFacotry();

  const matchesService = {
    async find(params) {
      return db.get('matches').value();
    },
    async create(data, params) {
      const {valid, validator} = validate('match', data);
      if (!valid) throw new BadRequest(validator.errors);
      const id = uuid4();
      return id;
    },
  };
  app.use('/api/matches', matchesService);

  const teamsService = {
    async find(params) {
      return db.get('teams').value();
    },
    async create(data, params) {
      const {valid, validator} = validate('team', data);
      if (!valid) throw new BadRequest(validator.errors);
      const id = uuid4();
      return id;
    },
  };
  app.use('/api/teams', teamsService);

  app.use('/', express.static(path.resolve(clientDir)));
  app.use('/schema', express.static(path.resolve(__dirname, 'schema')));

  app.on('connection', (connection) => app.channel('everybody').join(connection));
  app.publish((data) => app.channel('everybody'));

  app.use(express.errorHandler());
};
