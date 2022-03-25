module.exports = (_io) => {
  console.log('[SOCKET_EVENTS]: start socket ...');

  _io.on('connection', (socket) => {
    console.log('[SOCKET_EVENTS]: user connected ...');

    socket.on('subscribe_time', (room) => {
      socket.join(room);
    });

    socket.on('new message', (conv) => {
      console.log('[SOCKET_EVENTS]:[NEW_MESSAGE]:', JSON.stringify(conv));
      _io.sockets.in(conv).emit('refresh message', conv);
    });

    socket.on('disconnect', () => {
      console.log('[SOCKET_EVENTS]: user disconnected ...');
    });
  });
};
