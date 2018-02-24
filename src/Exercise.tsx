import React, { Component } from 'react'

interface Props {}

class Exercise extends Component<Props> {
  componentDidMount() {}

  render() {
    return (
      <main>
        <p>Excercise Page</p>
        <pre>
          <code />
        </pre>
      </main>
    )
  }
}

export default Exercise
