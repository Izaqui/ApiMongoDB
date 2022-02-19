const express = require('express');

//Criar e adicionar rotas
//const User = require('./');


const service = require('./services');

const database = require('./DataBase');

const routes = express.Router();


//Rotas de usuario
routes.get('/users', service.index);
routes.post('./users',service.create)
routes.delete('users/:cpf', service.delete);

module.exports = routes;