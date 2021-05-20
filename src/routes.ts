import { Router } from 'express';
import { SettingsController } from './controllers/SettingsController';
import { UsersController } from './controllers/UsersControllers';
import { MessagesController } from './controllers/MessagesController';

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

const routes = Router();

routes.post('/settings', settingsController.create);
routes.post('/users', usersController.create);
routes.post('/messages', messagesController.create);
routes.get('/messages/:id', messagesController.showByuser);

export { routes };
