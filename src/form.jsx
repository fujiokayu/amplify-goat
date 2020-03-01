import React from 'react'
import API, { graphqlOperation } from '@aws-amplify/api'
import Amplify from 'aws-amplify'
import { createTodo } from './graphql/mutations'

async function _getUserName() {
  const tokens = await Amplify.Auth.currentSession()
  return tokens.getIdToken().payload['cognito:username']
}

export class TodoForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  async handleSubmit(event) {
    if (this.state.value === '' || this.state.value === undefined) {
      return
    }
    const userName = await _getUserName()
    const todo = { name: userName, description: this.state.value }
    await API.graphql(graphqlOperation(createTodo, { input: todo }))

    console.log('submitted: ' + this.state.value)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label className="siimple-label siimple--color-brack">
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            className="siimple-input siimple-input--fluid"
            placeholder="Your Todo"
          />
        </label>
        <input type="submit" value="Add Todo" className="siimple-btn siimple-btn--primary" />
      </form>
    )
  }
}

export default TodoForm
