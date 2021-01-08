"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = require("./user");
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.set('port', 8080);
const server = app.listen(app.get('port'), () => {
    console.log(`Server port`, app.get('port'));
});
const io = socket_io_1.default.listen(server);
io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = user_1.addUser({ id: socket.id, name, room });
        if (error)
            return callback(error);
        socket.join(user.room);
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome.` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
        io.to(user.room).emit('roomData', { room: user.room, users: user_1.getUsersInRoom(user.room) });
        callback();
    });
    socket.on('sendMessage', (message, callback) => {
        const user = user_1.getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });
        callback();
    });
    socket.on('sendComment', (comment, callback) => {
        const user = user_1.getUser(socket.id);
        io.to(user.room).emit('comment', { user: user.name, text: comment });
        callback();
    });
    socket.on('disconnect', () => {
        const user = user_1.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: user_1.getUsersInRoom(user.room) });
        }
    });
});
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    //res.header('Access-Control-Allow-Origin', 'https://vcfront.zencast.tv');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});
