import React, { useState, useEffect } from 'react';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/user1')
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        label: inputValue,
        done: false,
      };

      fetch('https://assets.breatheco.de/apis/fake/todos/user/user1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...todos, newTodo]),
      })
        .then((response) => response.json())
        .then(() => {
          setTodos([...todos, newTodo]);
          setInputValue('');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDeleteTodo = (index) => {
    const todoToDelete = todos[index];
    const updatedTodos = todos.filter((_, idx) => idx !== index);

    fetch('https://assets.breatheco.de/apis/fake/todos/user/user1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodos),
    })
      .then((response) => response.json())
      .then(() => {
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.label}
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
