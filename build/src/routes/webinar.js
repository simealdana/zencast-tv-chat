"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webinarController_1 = require("../controllers/webinarController");
class WebinarRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/createRoom', webinarController_1.webinar.createRoom);
        this.router.post('/validRoom', webinarController_1.webinar.validRoom);
        this.router.get('/createHash', webinarController_1.webinar.generateHash);
        this.router.get('/createStreamId', webinarController_1.webinar.createStreamId);
        this.router.post('/deleteStreamId', webinarController_1.webinar.deleteStreamId);
    }
}
const webinarRoutes = new WebinarRoutes();
exports.default = webinarRoutes.router;
