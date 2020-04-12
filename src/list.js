import React, { useEffect, useReducer } from 'react'
import API, { graphqlOperation } from '@aws-amplify/api'

import { listTodos } from './graphql/queries'

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

const List = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    async function getData() {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      dispatch({ type: QUERY, todos: todoData.data.listTodos.items })
    }
    getData()
  }, [])

  return (
    <div className="siimple--color-dark">
      {state.todos.length > 0 ? (
        state.todos.map((todo) => (
          <p key={todo.id}>
            {todo.name} : {todo.description}
          </p>
        ))
      ) : (
        <p>Add some todos!</p>
      )}
    </div>
  )
}

export default List
