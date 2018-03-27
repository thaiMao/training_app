import React, { SFC } from 'react'
import { Helmet } from 'react-helmet'

interface Props {
  homeScreenTitle: string
}

const AppleMeta: SFC<Props> = props => {
  const { homeScreenTitle } = props

  return (
    <React.Fragment>
      <Helmet>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta
          name="apple-mobile-web-app-title"
          content={`${homeScreenTitle}`}
        />
      </Helmet>
    </React.Fragment>
  )
}

export default AppleMeta
