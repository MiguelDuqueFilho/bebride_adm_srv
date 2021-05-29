import { logger } from '../logger';
import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { MessagesService } from '../services/MessagesService';

io.on('connect', async (socket) => {
  const connetionServices = new ConnectionsService();
  const messagesService = new MessagesService();

  const allConnectionWithoutAdmin =
    await connetionServices.findAllWithoutAdmin();

  io.emit('admin_list_all_users', allConnectionWithoutAdmin);

  socket.on('admin_list_messages_by_user', async (params, callback) => {
    logger.debug(`>>> socket event admin_list_messages_by_user`);
    logger.trace({ params });
    const { user_id } = params;

    const allMessages = await messagesService.listByuser(user_id);
    logger.trace(`listByuser => allMessages .......`);
    logger.trace({ allMessages });
    callback(allMessages);
    logger.trace(`<<< socket event admin_list_messages_by_user`);
  });

  socket.on('admin_send_message', async (params) => {
    logger.debug(`>>> socket event admin_send_message`);
    logger.trace({ params });
    const { text, user_id } = params;

    await messagesService.create({
      text,
      user_id,
      admin_id: '1', // Number(socket.id), //acertar para o admin_id receber o sockt_id que é uma string
    });

    const { socket_id } = await connetionServices.findByUserId(user_id);

    io.to(socket_id).emit('admin_send_to_client', {
      text,
      socket_id,
    });
    logger.debug(`<<< socket event admin_send_message`);
  });

  socket.on('admin_user_in_support', async (params) => {
    const { user_id } = params;

    // await connetionServices.updateAdminId(user_id, socket_id);
  });
});
