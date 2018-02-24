import { BrowserRouter, Route, StaticRouter, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import About from 'About'
import Exercise from 'Exercise'
import Home from 'Home'
import NotFound from 'NotFound'
import { Provider } from 'react-redux'
import store from 'store'
import { theme } from 'theme'

interface Props {}

class App extends Component<Props> {
  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/:id" component={Exercise} />
              <Route path="/about" component={About} />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    )
  }
}

export default App
