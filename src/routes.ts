import { Router } from 'express';

/**
 * Import Controllers
 */
import { SettingsController } from './controllers/SettingsController';
import { UsersController } from './controllers/UsersControllers';
import { MessagesController } from './controllers/MessagesController';
import { EventsController } from './controllers/EventsController';
import { ProfilesController } from './controllers/ProfilesController';

/**
 * Import Middlewares
 */
import {
  isAuthenticate,
  isAuthenticatedAdmin,
} from './middlewares/authenticate';
import { routerLevel } from './middlewares/routerLevel';

/**
 * Import Schema validation data
 */
import { createUserSchema } from './middlewares/joiSchema/userSchema';

/**
 * define Controllers
 */
const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();
const eventsController = new EventsController();
const profilesController = new ProfilesController();

/**
 * define Express Routes
 */

const routes = Router();

/**
 * Level Router
 */
routes.use(routerLevel);

/**
 * Settings
 */

routes.post('/settings', settingsController.create);
routes.get('/settings/:username', settingsController.findByUsername);
routes.put('/settings/:username', settingsController.update);

/**
 * Profiles
 */
routes.get('/profiles/:id', profilesController.findById);

/**
 * Users
 */
routes.post('/login', usersController.login);
routes.post('/users', createUserSchema, usersController.create);
routes.get(
  '/users/email/:email',
  isAuthenticatedAdmin,
  usersController.findByEmail
);
routes.get('/users/:id', isAuthenticate, usersController.findById);
// routes.put('/users/:id', updateUserSchema, usersController.update);

/**
 * Messages
 */
routes.post('/messages', messagesController.create);
routes.get('/messages/:id', messagesController.showByuser);
routes.post('/events', eventsController.create);

export { routes };
