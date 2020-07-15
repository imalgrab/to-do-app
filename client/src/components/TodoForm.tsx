import React, { useState, ChangeEvent, FormEvent, MouseEvent } from 'react'

interface Props {
    addTodo: (text: string) => void;
    searchTodo: (text: string) => void;
}

export const TodoForm: React.FC<Props> = ({ addTodo, searchTodo }) => {
    const [textVal, setTextVal] = useState('');
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTextVal(value);
    }
    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (textVal !== '') {
            const todo = textVal;
            addTodo(todo);
            setTextVal('');
        }
    }
    const handleSubmitKey = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (textVal !== '') {
            const todo = textVal;
            addTodo(todo);
            setTextVal('');
        }
    }
    const handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        searchTodo(textVal);
        setTextVal('');
    }
    return (
        <form onSubmit={handleSubmitKey} className="todo-form">
            <input type="text" value={textVal} onChange={handleChange} />
            <i className="material-icons"
                onClick={handleSubmit}>add</i>
            <i className="material-icons"
                onClick={handleSearch}>search</i>
        </form >
    );
}