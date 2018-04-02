import React, { SFC } from 'react'

interface Props {
  error: boolean
  pastDelay: boolean
  timedOut: boolean
}

const Loading: SFC<Props> = props => {
  if (props.error) {
    return <div>Error</div>
  } else if (props.timedOut) {
    return <div>Taking a long time...</div>
  } else if (props.pastDelay) {
    return <div>This is a loading component</div>
  } else {
    return null
  }
}

export default Loading
