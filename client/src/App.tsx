import React, { useState } from 'react';
import { ALL, SEARCH, PENDING, DONE } from './constants';
import { TodoInfo } from './components/TodoInfo';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { TodoFilter } from './components/TodoFilter';

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState(Array<Todo>(0));
  const [specificTodos, setSpecificTodos] = useState(Array<Todo>(0));
  const [isFilter, setFilter] = useState(false);
  const [status, setStatus] = useState(ALL);

  const handleInsert = (todo: Todo) => {
    setTodos([...todos, todo]);
    setStatus(ALL);
  }
  const handleCheck = (id: number) => {
    const newTodos = [...todos];
    console.log(newTodos);
    newTodos.forEach(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    });
    setTodos(newTodos);
  }
  const handleEdit = (id: number, newVal: string) => {
    const newTodos = [...todos];
    newTodos.forEach(todo => {
      if (todo.id === id) {
        todo.text = newVal;
      }
    });
    setTodos(newTodos);
  }
  const handleDelete = (id: number) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
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
        currId={todos.length === 0 ? 0 : todos[todos.length - 1].id + 1}
        addTodo={handleInsert}
        searchTodo={handleSearch} />
      <TodoFilter
        numOfTodos={todos.length}
        numOfDone={todos.filter(todo => todo.completed === true).length}
        filterTodos={handleFilter} />
    </div>
  );
}