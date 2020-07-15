import React, { useState, useEffect } from 'react';
import { ALL, SEARCH, PENDING, DONE } from './constants';
import { TodoInfo } from './components/TodoInfo';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { TodoFilter } from './components/TodoFilter';

export type Todo = {
  _id: string;
  text: string;
  completed: boolean;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState(Array<Todo>(0));
  const [specificTodos, setSpecificTodos] = useState(Array<Todo>(0));
  const [isFilter, setFilter] = useState(false);
  const [status, setStatus] = useState(ALL);

  useEffect(() => {
    fetch('/api/todos')
      .then(response => response.json())
      .then(data => setTodos(data));
  });

  const handleInsert = async (text: string) => {
    await fetch('/api/todos', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
  }
  const handleCheck = async (id: string) => {
    await fetch(`/api/todos/${id}`, {
      method: 'put',
    })

  }
  const handleEdit = async (id: string, newVal: string) => {
    await fetch(`api/todos/${id}/${newVal}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newVal })
    });
  }
  const handleDelete = async (id: string) => {
    await fetch(`/api/todos/${id}`, {
      method: 'delete',
    })
  }
  const handleSearch = (text: string) => {
    const searchFrom = isFilter ? [...specificTodos] : [...todos];
    const newTodos = searchFrom.filter(todo => todo.text.includes(text));
    setStatus(SEARCH);
    setSpecificTodos(newTodos);
  }
  const handleFilter = (state: string) => {
    switch (state) {
      case ALL:
        setFilter(false);
        setStatus(ALL);
        break;
      case PENDING:
        setFilter(true);
        setStatus(PENDING);
        const pendingTodos = todos.filter(todo => todo.completed === false);
        setSpecificTodos(pendingTodos);
        break;
      case DONE:
        setFilter(true);
        setStatus(DONE);
        const doneTodos = todos.filter(todo => todo.completed === true);
        setSpecificTodos(doneTodos);
        break;
      default:
        break;
    }
  }
  let currTodos = [...todos];
  switch (status) {
    case PENDING:
      currTodos = todos.filter(todo => todo.completed === false);
      break;
    case DONE:
      currTodos = todos.filter(todo => todo.completed === true);
      break;
    case SEARCH:
      currTodos = [...specificTodos];
      break;
    default:
      currTodos = [...todos];
      break;
  }
  return (
    <div>
      <TodoInfo count={todos.length} />
      <TodoList
        todos={currTodos}
        toggleChecked={handleCheck}
        editTodo={handleEdit}
        deleteTodo={handleDelete}
      />
      <TodoForm
        addTodo={handleInsert}
        searchTodo={handleSearch} />
      <TodoFilter
        numOfTodos={todos.length}
        numOfDone={todos.filter(todo => todo.completed === true).length}
        filterTodos={handleFilter} />
    </div>
  );
}
