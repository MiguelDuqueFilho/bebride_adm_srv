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
import {
  createUserSchema,
  updateUserSchema,
} from './middlewares/joiSchema/userSchema';

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

routes.post('/settings', isAuthenticatedAdmin, settingsController.create);
routes.get(
  '/settings/:username',
  isAuthenticatedAdmin,
  settingsController.findByUsername
);
routes.put(
  '/settings/:username',
  isAuthenticatedAdmin,
  settingsController.update
);

/**
 * Profiles
 */
routes.get('/profiles/:id', isAuthenticatedAdmin, profilesController.findById);

/**
 * Users without Autorization
 */
routes.post('/login', usersController.login);
routes.post('/register', usersController.register);

/**
 * Users with Autorization
 */
routes.post(
  '/users',
  isAuthenticatedAdmin,
  createUserSchema,
  usersController.create
);
routes.put(
  '/users/:id',
  isAuthenticatedAdmin,
  updateUserSchema,
  usersController.update
);
routes.get(
  '/users/email/:email',
  isAuthenticatedAdmin,
  usersController.findByEmail
);
routes.get('/users/:id', isAuthenticatedAdmin, usersController.findById);

/**
 * Messages
 */
routes.post('/messages', isAuthenticatedAdmin, messagesController.create);
routes.get(
  '/messages/:id',
  isAuthenticatedAdmin,
  messagesController.showByuser
);
routes.post('/events', isAuthenticatedAdmin, eventsController.create);

export { routes };
