import React from 'react'

const List = props => (
  <div className="siimple--color-dark">
    {props.todos.length > 0 ? (
      props.todos.map(todo => (
        <p key={todo.id}>
          {todo.name} : {todo.description}
        </p>
      ))
    ) : (
      <p>Add some todos!</p>
    )}
  </div>
)

export default List
