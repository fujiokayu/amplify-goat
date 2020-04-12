import React from 'react'
import Amplify from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'

import awsconfig from './aws-exports'
import './App.css'
import signUpConfig from './signUpConfig'
import TodoForm from './form'
import List from './list'

Amplify.configure(awsconfig)

function App() {
  return (
    <div className="App">
      <h1 className="siimple--color-primary">Amplify Goat</h1>
      <h4 className="siimple--color-dark">Vulnerable web app by using Amplify.</h4>
      <TodoForm />
      <List todos />
    </div>
  )
}

export default withAuthenticator(App, {
  // Render a sign out button once logged in
  includeGreetings: true,
  signUpConfig,
})
