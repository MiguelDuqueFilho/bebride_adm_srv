import { Router } from 'express';
import { SettingsController } from './controllers/SettingsController';
import { UsersController } from './controllers/UsersControllers';
import { MessagesController } from './controllers/MessagesController';
import { EventsController } from './controllers/EventsController';
import { ProfilesController } from './controllers/ProfilesController';

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();
const eventsController = new EventsController();
const profilesController = new ProfilesController();

const routes = Router();

routes.post('/settings', settingsController.create);
routes.get('/settings/:username', settingsController.findByUsername);
routes.put('/settings/:username', settingsController.update);

routes.get('/profiles/:id', profilesController.findById);

routes.post('/login', usersController.login);
routes.post('/register', usersController.create);
routes.get('/users/email/:email', usersController.findByEmail);
routes.get('/users/:id', usersController.findById);

routes.post('/messages', messagesController.create);
routes.get('/messages/:id', messagesController.showByuser);
routes.post('/events', eventsController.create);

export { routes };
