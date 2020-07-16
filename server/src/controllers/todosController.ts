import { Request, Response, NextFunction } from 'express';
import { Todo } from '../models/Todo';

export const getTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todos = await Todo.find();
        return res.send(todos);
    } catch (error) {
        return res.status(500).json({
            error: 'Server error'
        });
    }
}

export const addTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Todo.create(req.body);
        return res.status(201).json({
            success: true
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                error: {
                    message: error.errors.text.properties.message,
                    path: error.errors.text.properties.path
                }
            })
        }
        return res.status(500).json({
            error: 'Server error'
        })
    }
}

export const editTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({
                error: 'no todo with such id'
            });
        }
        await Todo.findOneAndUpdate({ _id: req.params.id }, { text: req.body.text });
        return res.status(201).json({
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Server error'
        })
    }
}

export const toggleChecked = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({
                error: 'no todo with such id'
            });
        }
        const newStatus = !todo.get('completed');
        await Todo.findOneAndUpdate({ _id: req.params.id }, { completed: newStatus });
        return res.status(201).json({
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Server error'
        })
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