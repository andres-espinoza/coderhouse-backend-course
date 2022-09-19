// eslint-disable-next-line no-undef
const clientSocket = io();

const messageRecieved = (response) => {
  console.log(response);
};

class Chat {
  static io = clientSocket;

  constructor(cb) {
    Chat.io.on('chatMessage', cb);
  };

  // eslint-disable-next-line class-methods-use-this
  emitMessage(message) {
    Chat.io.emit('chatMessage', message);
  };
};

const chat = new Chat(messageRecieved);

chat.emitMessage('Saludos desde el cliente');



