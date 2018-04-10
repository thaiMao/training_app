import { Link } from 'react-router-dom'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { State } from 'reducers/exercises'
import { Helmet } from 'react-helmet'
import { AppleMeta } from 'meta'
import Worker from 'workers'
import * as utils from 'app-utils'

const worker: any = new Worker()
worker.postMessage({ a: 1 })
worker.onmessage = (event: any) => {
  console.log(event.data.result)
}

function mapStateToProps(state: State) {
  return {
    exercises: state.exercises
  }
}

interface Props {
  exercises?: Array<any>
}

@(connect(mapStateToProps) as any)
class Home extends PureComponent<Props> {
  componentDidMount() {
    const URL = 'http://localhost:3000/'
    const request = new Request(URL)

    fetch(request).then(function(response) {
      response.json().then(function(data) {
        console.log('Server response: ', data)
      })
    })
  }

  async handleCreateUser() {
    const user = { name: 'Tony Montana' }
    const body = JSON.stringify(user)
    const postUserOptions = utils.Fetch.postJSONOptions(body)
    const createOneUser = utils.Fetch.fetchUser(postUserOptions)

    try {
      const data = await createOneUser
      const jsonData = await data.json()
      console.log('Server POST response: ', jsonData)
      // TODO handle different status responses with appropriate messages
    } catch (error) {
      console.error('Network error', error)
    }
  }

  render() {
    const homeScreenTitle = 'Traning App'
    const schema = JSON.stringify({
      '@context': 'http://schema.org',
      '@type': 'Product',
      image: 'dell-30in-lcd.jpg',
      name: 'Dell UltraSharp 30" LCD Monitor',
      offers: {
        '@type': 'Offer',
        price: '$1495'
      }
    })

    return (
      <React.Fragment>
        <Helmet>
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta
            name="apple-mobile-web-app-title"
            content={`${homeScreenTitle}`}
          />
          <script type="application/ld+json">{schema}</script>
        </Helmet>
        <h1>My Brand</h1>
        <button>Login</button>
        <button onClick={this.handleCreateUser}>Create New User</button>
        <Link to="/about">About</Link>
        <link
          href="https://placehold.it/152"
          sizes="152*152"
          rel="apple-touch-icon"
        />

        <pre>
          <code>{JSON.stringify(this.props.exercises, null, 4)}</code>
        </pre>
      </React.Fragment>
    )
  }
}

export default Home
