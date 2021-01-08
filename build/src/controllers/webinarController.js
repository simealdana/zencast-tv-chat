"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webinarTools_1 = require("../clases/webinarTools");
const room_1 = __importDefault(require("../models/room"));
const crypto = require('crypto');
const axios = require('axios').default;
class Webinar {
    constructor() {
    }
    createRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.roomId) {
                let users = [];
                users.push(req.body.user);
                const roomInterface = new room_1.default();
                roomInterface.adminRoom = {
                    isAdmin: true,
                    streamId: req.body.streamId,
                    stream: req.body.stream,
                    socketId: req.body.stream,
                };
                roomInterface.roomId = req.body.roomId;
                roomInterface.user = users;
                const roomsValid = webinarTools_1.webinarTools.getRooms.length > 0 ? webinarTools_1.webinarTools.validRooms(roomInterface) : true;
                if (roomsValid) {
                    webinarTools_1.webinarTools.setRooms(roomInterface);
                }
                const rooms = webinarTools_1.webinarTools.getRooms();
                yield res.status(200).json({ rooms: rooms });
            }
            else {
                res.status(400).json({ error: 'bad Requets' });
            }
        });
    }
    validRoom(req, res) {
        if (req.body) {
            const valid = webinarTools_1.webinarTools.validRooms(req.body);
            if (valid) {
                const rooms = webinarTools_1.webinarTools.room;
                res.status(200).json({ valid: true });
            }
            else {
                res.status(200).json({ valid: false });
            }
        }
        else {
            res.status(400).json({ error: 'bad Requets' });
        }
    }
    generateHash(req, res) {
        let id = crypto.randomBytes(20).toString('hex');
        res.status(200).json({ roomsHash: id });
    }
    createStreamId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield axios({
                method: 'post',
                url: 'https://videoconference.ulive.io:5443/LiveApp/rest/v2/broadcasts/create',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                cache: 'default',
            }).then(data => {
                res.status(200).json(data.data);
            })
                .catch(error => {
                console.log(error);
                res.status(500).json({ error: 'Error Interno de servidor' });
            });
        });
    }
    deleteStreamId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield axios({
                method: 'delete',
                url: 'https://videoconference.ulive.io:5443/LiveApp/rest/v2/broadcasts/' + req.body.streamId,
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                cache: 'default'
            }).then(() => {
                res.status(200).json({ delete: true });
            }).catch(error => {
                console.log(error);
                res.status(200).json({ delete: false });
            });
        });
    }
}
exports.webinar = new Webinar();
