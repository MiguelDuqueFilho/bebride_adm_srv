import { logger } from '../logger';
import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { UsersService } from '../services/UsersService';
import { MessagesService } from '../services/MessagesService';

interface IParams {
  text: string;
  email: string;
}

io.on('connect', (socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();

  logger.debug(`io on connect recebido socket.id:${socket.id}`);

  socket.on('client_first_access', async (params) => {
    logger.debug(`client_first_access:`);
    logger.debug({ params });
    //   const socket_id = socket.id;
    const { text, email } = params as IParams;

    let user_id = null;
    const userExists = await usersService.findByEmail({ email });

    logger.debug('userExists...');
    logger.debug({ userExists });

    if (!userExists) {
      const user = await usersService.create({ email });
      logger.debug('user...');
      logger.debug(user);
      await connectionsService.create({
        socket_id: socket.id,
        user_id: user.id,
      });

      user_id = user.id;
    } else {
      user_id = userExists.id;

      //     const connection = await connectionsService.findByUserId(userExists.id);

      //     if (!connection) {
      //       await connectionsService.create({
      //         socket_id,
      //         user_id: userExists.id,
      //       });
      //     } else {
      //       connection.socket_id = socket_id;
      //       await connectionsService.update(connection);
      //     }
    }

    //   await messagesService.create({
    //     text,
    //     user_id,
    //   });

    //   const allMessages = await messagesService.listByuser(user_id);

    //   socket.emit('client_list_all_messages', allMessages);

    //   const allUsers = await connectionsService.findAllWithoutAdmin();

    //   io.emit('admin_list_all_messages', allUsers);
  });

  // socket.emit('client_send_to_admin', async (params) => {
  //   const { text, socket_admin_id } = params;
  //   const socket_id = socket_id;

  //   const { user_id } = await connectionsService.findBySocketId(socket_id);

  //   const message = await messagesService.create({
  //     text,
  //     user_id,
  //   });
  //   io.to(socket_admin_id).emit('admin_receive_message', {
  //     message,
  //     socket_id,
  //   });
  // });
});
