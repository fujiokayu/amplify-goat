import React, { useEffect, useReducer } from 'react'
import Amplify from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import API, { graphqlOperation } from '@aws-amplify/api'

import { listTodos } from './graphql/queries'

import awsconfig from './aws-exports'
import './App.css'
import signUpConfig from './signUpConfig'
import TodoForm from './form'
import List from './list'

Amplify.configure(awsconfig)

// Action Types
const QUERY = 'QUERY'

const initialState = {
  todos: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case QUERY:
      return { ...state, todos: action.todos }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    async function getData() {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      dispatch({ type: QUERY, todos: todoData.data.listTodos.items })
    }
    getData()
  }, [])

  return (
    <div className="App">
      <h1 className="siimple--color-primary">Amplify Goat</h1>
      <h4 className="siimple--color-dark">Vulnerable web app by using Amplify.</h4>
      <TodoForm />
      <List todos={state.todos} />
    </div>
  )
}

export default withAuthenticator(App, {
  // Render a sign out button once logged in
  includeGreetings: true,
  signUpConfig,
})
