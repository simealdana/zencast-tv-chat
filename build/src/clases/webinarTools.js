"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeCache = require("node-cache");
const myCache = new NodeCache();
class WebinarTools {
    constructor() {
        this.room = [];
        this.personas = [];
    }
    setPersona(persona) {
        let personasCache = myCache.get('personas');
        if (personasCache) {
            this.personas = personasCache;
        }
        this.personas.push(persona);
        myCache.set('personas', this.personas);
    }
    getPersonas() {
        let personasCache = myCache.get('personas');
        if (personasCache) {
            this.personas = personasCache;
        }
        return this.personas;
    }
    getPersona(streamId) {
        let personasCache = myCache.get('personas');
        if (personasCache) {
            this.personas = personasCache;
        }
        const persona = this.personas.find(e => e.streamId === streamId);
        return persona;
    }
    getPesonaBySocketId(id) {
        let personasCache = myCache.get('personas');
        if (personasCache) {
            this.personas = personasCache;
        }
        const persona = this.personas.find(e => e.socketsId === id);
        return persona;
    }
    deletePersona(socketsId) {
        const newPersonasList = this.personas.filter(e => e.streamId !== socketsId);
        this.personas = newPersonasList;
        return this.personas;
    }
    setPersonToRoom(persona, room) {
        let rooms = myCache.get('rooms');
        if (rooms) {
            this.room = rooms;
        }
        this.room.forEach((e) => {
            if (e.roomId === room) {
                e.user.push(persona);
            }
        });
        const roomBy = this.room.filter(e => e.roomId === room);
        return roomBy;
    }
    getRooms() {
        let rooms = myCache.get('rooms');
        if (rooms) {
            this.room = rooms;
        }
        return this.room;
    }
    setRooms(room) {
        let rooms = myCache.get('rooms');
        if (rooms) {
            this.room = rooms;
        }
        if (room) {
            this.room.push(room);
            myCache.set('rooms', this.room);
            return this.room;
        }
    }
    validRooms(room) {
        let valid = false;
        let roomCache = myCache.get('rooms');
        this.room = roomCache ? roomCache : [];
        if (this.room.length > 0) {
            this.room.forEach((res) => {
                if (res.roomId === room.roomId) {
                    valid = true;
                }
            });
        }
        return valid;
    }
    leaveRoom(streamId, roomId) {
        let roomCache = myCache.get('rooms');
        const room = roomCache.filter(e => e.roomId === roomId);
        const newUsers = room[0].user.filter(e => e.streamId !== streamId);
        roomCache.forEach(e => {
            if (e.roomId === roomId) {
                e.users = newUsers;
            }
        });
        this.room = roomCache;
        myCache.set('rooms', this.room);
    }
    changeCamara(streamId) {
        let value;
        let personasCache = myCache.get('personas');
        if (personasCache) {
            this.personas = personasCache;
        }
        this.personas.forEach((e) => {
            if (e.streamId === streamId) {
                e.camaraOff = !e.camaraOff;
                value = e.camaraOff;
            }
        });
        myCache.set('personas', personasCache);
        return value;
    }
    changeMicro(streamId) {
        let value;
        let personasCache = myCache.get('personas');
        if (personasCache) {
            this.personas = personasCache;
        }
        this.personas.forEach((e) => {
            if (e.streamId === streamId) {
                e.microMitue = !e.microMitue;
                value = e.microMitue;
            }
        });
        myCache.set('personas', personasCache);
        return value;
    }
}
exports.webinarTools = new WebinarTools();
