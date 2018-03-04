import React, { PureComponent, MouseEvent } from 'react'

interface State {
  count: number
}

class Count extends PureComponent {
  state = {
    count: 0
  }

  onIncrement = (event: MouseEvent<any>) => {
    event.preventDefault
    this.setState((state: State) => ({ count: state.count + 1 }))
  }

  render() {
    const { count } = this.state

    return (
      <div>
        <h1>Count {count}</h1>
        <button onClick={this.onIncrement}>Increment</button>
      </div>
    )
  }
}

export default Count
