'use strict';

const config = require('./config');
const repos = require('./repositories');
const chatService = require('../lib/facade/chat');

const ip = config.get('ip');
const port = config.get('port');

module.exports = (socket) => {
  const socketId = `${ip}:${port}:${socket.client.conn.id}`;
  socket.emit('register', '');

  socket.on('register', (data) => {
    const token = data.token;

    return repos.user.save(socketId, token)
      .catch(errorHandler);
  });

  socket.on('disconnect', () => {
    return repos.user.remove(socketId)
      .catch(errorHandler);
  });

  socket.on('readMessage', (data) => {
    return repos.user.findUserBySocketId(socketId)
      .then((user) => {
        let payload = {
          chatId: data.chatId,
          userId: user.userId
        };

        return chatService.updateLastMessageRead(payload);
      })
      .catch(errorHandler);
  });

  function errorHandler(err) {
    socket.emit('twError', String(err));

    return Promise.resolve();
  }
};
