import React, { useEffect, useReducer } from 'react';
import Amplify, { Auth } from 'aws-amplify';

import API, { graphqlOperation } from '@aws-amplify/api';

import { createTodo } from './graphql/mutations';
import { listTodos } from './graphql/queries';

import awsconfig from './aws-exports';
import './App.css';

Amplify.configure({
  Auth: awsconfig,
  API: awsconfig
});

// Action Types
const QUERY = 'QUERY';

const initialState = {
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case QUERY:
      return {...state, todos: action.todos};
    default:
      return state;
  }
};

async function createNewTodo() {
  const todo = { name: "Use AWS AppSync", description: "RealTime and Offline" };
  await API.graphql(graphqlOperation(createTodo, { input: todo }));
  window.location.reload();
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getData() {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      dispatch({ type: QUERY, todos: todoData.data.listTodos.items });
    }
    getData();
  }, []);

  return (
    <div className="App">
      <button onClick={createNewTodo}>Add Todo</button>
      <div>
        {state.todos.length > 0 ? 
          state.todos.map((todo) => <p key={todo.id}>{todo.name} : {todo.description}</p>) :
          <p>Add some todos!</p> 
        }
      </div>
    </div>
  );
}

export default App;