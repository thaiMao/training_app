///<reference path="typings.d.ts" />
import 'file-loader?name=./web-app-manifest.json!./web-app-manifest.json'
// import 'add-to-homescreen/addtohomescreen.js'
// import 'styles/addtohomescreen.css'
import { Route, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Loadable from 'react-loadable'
import { Loading } from 'Loading'
import { Provider } from 'react-redux'
import store from 'store'
import { theme } from 'theme'

const About = Loadable({
  loader: () => import('About'),
  loading: Loading,
  timeout: 10000
})

const Count = Loadable({
  loader: () => import('Count'),
  loading: Loading,
  timeout: 10000
})

const Exercise = Loadable({
  loader: () => import('Exercise'),
  loading: Loading,
  timeout: 10000
})

const Home = Loadable({
  loader: () => import('Home'),
  loading: Loading,
  timeout: 10000
})

const Admin = Loadable({
  loader: () => import('Components/Admin/Admin'),
  loading: Loading,
  timeout: 10000
})

const NotFound = Loadable({
  loader: () => import('NotFound'),
  loading: Loading,
  timeout: 10000
})

// Render Props using Loadable.Map

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/count" component={Count} />
            <Route path="/about" component={About} />
            <Route path="/admin" component={Admin} />
            <Route path="/:id" component={Exercise} />
            <Route component={NotFound} />
          </Switch>
        </ThemeProvider>
      </Provider>
    )
  }
}

export default App
