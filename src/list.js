import React, { useEffect, useReducer } from 'react'
import API, { graphqlOperation } from '@aws-amplify/api'
import Amplify from 'aws-amplify'
import { listTodos } from './graphql/queries'

// Action Types
const QUERY = 'QUERY'

const initialState = {
  todos: [],
}

async function _getUserName() {
  const tokens = await Amplify.Auth.currentSession()
  return tokens.getIdToken().payload['cognito:username']
}

let descriptions = []
let links = []

const reducer = (state, action) => {
  switch (action.type) {
    case QUERY:
      return { ...state, todos: action.todos }
    default:
      return state
  }
}

const _containsURL = (todo) => {
  if (todo.description.match(/https:/) === null) return false
  return true
}

const List = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    async function getData() {
      const userName = await _getUserName()
      const todoData = await API.graphql(
        graphqlOperation(listTodos, {
          filter: {
            name: { eq: userName },
          },
        })
      )
      dispatch({ type: QUERY, todos: todoData.data.listTodos.items })
    }
    getData()
  }, [])

  state.todos.forEach((items) => {
    if (_containsURL(items)) {
      links.push(items)
    } else descriptions.push(items)
  })

  return (
    <div className="siimple--color-dark">
      <div>
        {descriptions.length > 0 ? (
          descriptions.map((todo) => (
            <p key={todo.id}>
              {todo.name} : {todo.description}
            </p>
          ))
        ) : (
          <p>Add some todos!</p>
        )}
      </div>
      <div>
        {links.length > 0 ? (
          links.map((url) => (
            <p key={url.id}>
              {url.name} : <a href={url.description}>{url.description}</a>
            </p>
          ))
        ) : (
          <p>Add some Links!</p>
        )}
      </div>
    </div>
  )
}

export default List
