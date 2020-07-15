import { Router } from 'express';
import { getTodos, addTodo, removeTodo, toggleChecked, editTodo } from '../controllers/todosController';
export const router: Router = Router();

router.route('/')
    .get(getTodos)
    .post(addTodo);

router.route('/:id')
    .delete(removeTodo)
    .put(toggleChecked)
    
router.route('/:id/:newVal')
    .put(editTodo)