import React, { MouseEvent, KeyboardEvent, ChangeEvent, FocusEvent, useState } from 'react'
import { Todo } from '../App';
import { KEY_ENTER, KEY_ESCAPE } from '../constants';

interface Props {
    todo: Todo;
    toggleChecked: (id: number) => void;
    editTodo: (id: number, newVal: string) => void;
    deleteTodo: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, toggleChecked, editTodo, deleteTodo }) => {
    const [editMode, setEditMode] = useState(false);
    const [showDelete, setDeleteMode] = useState(false);
    const [textVal, setTextVal] = useState(todo.text);
    const handleCheckboxClick = (e: ChangeEvent<HTMLInputElement>) => {
        const id = parseInt(e.target.id);
        toggleChecked(id);
    }
    const handleTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTextVal(value);
    }
    const handleTodoEdit = (e: MouseEvent<HTMLSpanElement>) => {
        setEditMode(true);
    }
    const handleTodoEditSubmitClick = (e: FocusEvent<HTMLInputElement>) => {
        // mouse click outside the input submits edit can be easily changed not to submit
        const id = parseInt(e.target.id);
        editTodo(id, textVal);
        setEditMode(false);
    }
    const handleTodoEditSubmitKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === KEY_ENTER) {
            const id = parseInt(e.currentTarget.id);
            editTodo(id, textVal);
            setEditMode(false);
        } else if (e.keyCode === KEY_ESCAPE) {
            setEditMode(false);
        }
    }
    const handleTodoDelete = (e: MouseEvent<HTMLButtonElement>) => {
        const id = parseInt(e.currentTarget.id);
        deleteTodo(id);
    }
    const className = todo.completed ? 'completed' : '';
    const isInEditMode = editMode;
    const innerBtn = showDelete ?
        <i id={todo.id.toString()}
            className="material-icons"
            onClick={handleTodoDelete}>clear</i> :
        null
    const todoItem = isInEditMode ?
        <li className="collection-item">
            <input
                id={todo.id.toString()}
                type="text"
                ref={input => input && input.focus()}
                value={textVal}
                onChange={handleTodoChange}
                onBlur={handleTodoEditSubmitClick}
                onKeyDown={handleTodoEditSubmitKey}
            />
        </li> :
        <li className="collection-item"
            onMouseEnter={() => setDeleteMode(true)}
            onMouseLeave={() => setDeleteMode(false)}>
            <label onDoubleClick={handleTodoEdit}>
                <input
                    id={todo.id.toString()}
                    type="checkbox" checked={todo.completed}
                    onChange={handleCheckboxClick} />
                <span className={className}>{todo.text}</span>
            </label>
            {innerBtn}
        </li>

    return todoItem;
}