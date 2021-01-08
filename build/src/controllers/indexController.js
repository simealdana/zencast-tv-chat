"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        res.render('index', { title: 'Welcome to Webinar' });
    }
}
exports.indexController = new IndexController();
