"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const todosController_1 = require("../controllers/todosController");
exports.router = express_1.Router();
exports.router.route('/')
    .get(todosController_1.getTodos)
    .post(todosController_1.addTodo);
exports.router.route('/:id')
    .delete(todosController_1.removeTodo);
