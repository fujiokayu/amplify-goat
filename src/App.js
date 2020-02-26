import React, { useEffect, useReducer } from 'react';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import API, { graphqlOperation } from '@aws-amplify/api';

import { createTodo } from './graphql/mutations';
import { listTodos } from './graphql/queries';

import awsconfig from './aws-exports';
import './App.css';

Amplify.configure(awsconfig);

// Action Types
const QUERY = 'QUERY';

const initialState = {
  todos: [],
};

async function getUserName() {
  const tokens = await Amplify.Auth.currentSession();
  return tokens.getIdToken().payload['cognito:username'];
}

const reducer = (state, action) => {
  switch (action.type) {
    case QUERY:
      return {...state, todos: action.todos};
    default:
      return state;
  }
};

async function createNewTodo() {
  const userName = await getUserName();
  const todo = { name: userName, description: "RealTime and Offline" };
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
const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'UserName',
      key: 'username',
      required: true,
      placeholder: 'UserName',
      type: 'string',
      displayOrder: 1
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      placeholder: 'Email',
      type: 'email',
      displayOrder: 2
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      placeholder: 'Password',
      type: 'password',
      displayOrder: 3
    }
  ]
};

export default withAuthenticator(App, {
  // Render a sign out button once logged in
  includeGreetings: true,
  signUpConfig
});
