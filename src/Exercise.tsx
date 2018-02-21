import React, { Component } from 'react'

class Exercise extends Component {
  componentDidMount() {}

  render() {
    return (
      <main>
        <p>Excercise Page</p>
        <pre>
          <code>{JSON.stringify(this.props, null, 4)}</code>
        </pre>
      </main>
    )
  }
}

export default Exercise
