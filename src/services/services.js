import PersistenceFactory from '../dao/factory.js';
import UserRepository from './users.js';

const dao = await PersistenceFactory.getPersistence();

const usersService =  new UserRepository(dao.users);

const services = {
    usersService,
}

export default services;