import React from 'react'
import { TodoItem } from './TodoItem';
import { Todo } from '../App';

interface Props {
    todos: Todo[],
    toggleChecked: (id: number) => void;
    editTodo: (id: number, newVal: string) => void;
    deleteTodo: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, toggleChecked, editTodo, deleteTodo }) => {
    const todoList = todos.map((todo: Todo) =>
        <TodoItem
            key={todo.id}
            todo={todo}
            toggleChecked={toggleChecked}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
        />
    )
    return (
        <ul className="collection">
            {todoList}
        </ul>
    );
}