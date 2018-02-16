import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { State } from 'reducers/exercises'

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
    return (
      <React.Fragment>
        <h1>My Brand</h1>
        <button>Login</button>
        <pre>
          <code>{JSON.stringify(this.props.exercises, null, 4)}</code>
        </pre>
      </React.Fragment>
    )
  }
}

export default Home
