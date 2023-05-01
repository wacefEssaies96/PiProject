const { Server } = require("socket.io");

const io = new Server({
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

var Socket = {
    emit: function (event, data) {
        console.log(event, data);
        io.sockets.emit(event, data);
    },
};

io.on('connection', (socket) => {
    console.log('a user connected');
    // io.emit("notification", {message: 'hello'})
});

exports.Socket = Socket;
exports.io = io;
