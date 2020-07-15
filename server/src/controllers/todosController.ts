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
        const todo = await Todo.create(req.body);
        return res.status(201).json({
            success: true,
            data: todo
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                error: {
                    message: error.errors.text.properties.message,
                    path: error.errors.text.properties.path
                }
            })
        } else {
            return res.status(500).json({
                error: 'Server error'
            })
        }
    }
}

export const removeTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({
                error: 'no todo with such id'
            });
        }
        await todo.remove();

        return res.status(200).json({
            removed: todo
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Server error'
        })
    }
}