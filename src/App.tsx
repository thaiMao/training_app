import React, { Component } from 'react'
import Home from 'Home'
import { Provider } from 'react-redux'
import store from 'store'

interface P {}

class App extends Component<P> {
  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <div>
          Hello, world
          <Home />
        </div>
      </Provider>
    )
  }
}

export default App
