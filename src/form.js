import React, { useState } from 'react'
import API, { graphqlOperation } from '@aws-amplify/api'
import Amplify from 'aws-amplify'
import { createTodo } from './graphql/mutations'

async function _getUserName() {
  const tokens = await Amplify.Auth.currentSession()
  return tokens.getIdToken().payload['cognito:username']
}

function _refreshPage() {
  window.location.reload()
}

const TodoForm = () => {
  const [description, setDescription] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!description.trim()) return
    const userName = await _getUserName()
    const todo = { name: userName, description: description }
    await API.graphql(graphqlOperation(createTodo, { input: todo }))
    _refreshPage()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="siimple-label siimple--color-brack">
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <input type="submit" value="Add Todo" className="siimple-btn siimple-btn--primary" />
    </form>
  )
}

export default TodoForm
