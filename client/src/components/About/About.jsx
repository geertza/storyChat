import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const About = props => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get('/todos')
      .then(response => {
        console.log(response);
        setTodos(response.data);
      })
      .catch(e => console.log(e));
  }, []);

  const postNewTodo = () => {
    axios
      .post('/new/todo')
      .then(response => {
        console.log(response);
        setTodos(response.data);
      })
      .catch(e => console.log(e));
  };

  return (
    <>
      <p style={{ fontSize: '32px' }}>
        About Path Reached
        <Link to={'/'}>
          Change Path to Home page
        </Link>
      </p>
      <button onClick={postNewTodo}>Add a Todo</button>

      <ol>
        {todos.map((todo, idx) => {
          return (
            <li key={`todo-${idx}`}>{todo}</li>
          );
        })}
      </ol>
    </>
  );
};

export default About;