const express = require('@feathersjs/express');
const shortid = require('shortid');
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const {BadRequest, Forbidden} = require('@feathersjs/errors');

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

  const ensureToken = (req, res, next) => {
    if (req.method === 'POST') {
      if (req.header('Authorization') !== `Basic ${process.env.SECRET_TOKEN}`) {
        throw new Forbidden('ur not gabs');
      }
    }
    next();
  };

  const matchesService = {
    async find(params) {
      return db.get('matches').value();
    },
    async create(data, params) {
      const {valid, validator} = validate('match', data);
      if (!valid) throw new BadRequest(validator.errors);

      if (db.get(`teams.${data.team1}`).value() === undefined) {
        throw new BadRequest(`Team '${data.team1}' doesn't exist in the database`)
      }
      if (db.get(`teams.${data.team2}`).value() === undefined) {
        throw new BadRequest(`Team '${data.team2}' doesn't exist in the database`)
      }

      const id = shortid.generate();
      await db.set(`matches.${id}`, data).write();
      return id;
    },
  };
  app.use('/api/matches', ensureToken, matchesService);

  const teamsService = {
    async find(params) {
      return db.get('teams').value();
    },
    async create(data, params) {
      const {valid, validator} = validate('team', data);
      if (!valid) throw new BadRequest(validator.errors);

      if (db.get(`teams.${data.name}`).value() !== undefined) {
        throw new BadRequest(`Team '${data.name}' already exists in the database`)
      }

      await db.set(`teams.${data.name}`, data).write();
      return data.name;
    },
  };
  app.use('/api/teams', ensureToken, teamsService);

  const secretService = {
    async find(params) {
      return 'stop poking around my api you dweeb';
    },
    async create(data, params) {
      const {valid, validator} = validate('secret', data);
      if (!valid) throw new BadRequest(validator.errors);

      const actualSecret = process.env.SECRET_KEY;
      if (actualSecret !== data.secret) throw new Forbidden('go away');
      return process.env.SECRET_TOKEN;
    },
  };
  app.use('/api/secret', secretService);

  app.use('/', express.static(path.resolve(clientDir)));
  app.use('/schema', express.static(path.resolve(__dirname, 'schema')));

  app.on('connection', (connection) => app.channel('everybody').join(connection));
  app.publish((data) => app.channel('everybody'));

  app.use(express.errorHandler());
};
