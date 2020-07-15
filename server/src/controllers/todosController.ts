import { Request, Response, NextFunction } from 'express';
import { Todo } from '../models/Todo';

export const getTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todos = await Todo.find();
        return res.status(200).json({
            count: todos.length,
            data: todos
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Server error'
        });
    }
}

export const addTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
        const todo = await Todo.create({
            text: "visit Lebanon"
        });
        return res.status(201).json({
            success: true,
            data: todo
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Server error'
        })
    }
}

export const removeTodo = (req: Request, res: Response, next: NextFunction) => {
    res.send('DELETE todo');
}