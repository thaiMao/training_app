import 'file-loader!./web-app-manifest.json'

import { Link } from 'react-router-dom'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { State } from 'reducers/exercises'
import { Helmet } from 'react-helmet'
import { AppleMeta } from 'meta'

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
  componentDidMount() {}

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
          <link href="dist/web-app-manifest.json" rel="manifest" />
          <script type="application/ld+json">{schema}</script>
        </Helmet>
        <h1>My Brand</h1>
        <button>Login</button>
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
