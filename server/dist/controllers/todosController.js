"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTodo = exports.addTodo = exports.getTodos = void 0;
const Todo_1 = require("../models/Todo");
exports.getTodos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo_1.Todo.find();
        return res.status(200).json({
            count: todos.length,
            data: todos
        });
    }
    catch (error) {
        return res.status(500).json({
            error: 'Server error'
        });
    }
});
exports.addTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const todo = yield Todo_1.Todo.create({
            text: "visit Lebanon"
        });
        return res.status(201).json({
            success: true,
            data: todo
        });
    }
    catch (error) {
        return res.status(500).json({
            error: 'Server error'
        });
    }
});
exports.removeTodo = (req, res, next) => {
    res.send('DELETE todo');
};
