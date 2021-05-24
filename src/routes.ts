import { Router } from 'express';
import { SettingsController } from './controllers/SettingsController';
import { UsersController } from './controllers/UsersControllers';
import { MessagesController } from './controllers/MessagesController';
import { EventsController } from './controllers/EventsController';
import { PersonsController } from './controllers/PersonsController';

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();
const eventsController = new EventsController();
const personsController = new PersonsController();

const routes = Router();

routes.post('/settings', settingsController.create);
routes.get('/settings/:username', settingsController.findByUsername);
routes.put('/settings/:username', settingsController.update);
routes.post('/users', usersController.create);
routes.post('/messages', messagesController.create);
routes.get('/messages/:id', messagesController.showByuser);
routes.post('/events', eventsController.create);
routes.post('/persons', personsController.create);

export { routes };
