import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  confirmFetchRequest,
  fetchStarWarsRequest,
  fetchStarWarsPlanetsRequest
} from 'actions/data'
import styled from 'styled-components'

interface Props {
  starWars?: any
  fetchStarWarsRequest?: Function
  fetchStarWarsPlanetsRequest?: Function
  confirmFetchRequest?: Function
}

interface State {
  open: boolean
}

const mapStateToProps = (state: any) => {
  const { starWars } = state
  return { starWars }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchStarWarsRequest: () => dispatch(fetchStarWarsRequest()),
    fetchStarWarsPlanetsRequest: () => dispatch(fetchStarWarsPlanetsRequest()),
    confirmFetchRequest: () => dispatch(confirmFetchRequest())
  }
}

@(connect(mapStateToProps, mapDispatchToProps) as any)
class Data extends Component<Props, State> {
  state = {
    open: false
  }

  handleClick = () => {
    this.props.fetchStarWarsRequest()
    this.props.fetchStarWarsPlanetsRequest()
    this.setState(state => ({ open: true }))
  }

  handleConfirm = () => {
    this.props.confirmFetchRequest()
    this.setState(state => ({ open: false }))
  }

  componentDidMount() {
    this.props.fetchStarWarsPlanetsRequest()
    this.props.confirmFetchRequest()
  }

  public render() {
    const {
      starWars: { people, planets },
      fetchStarWarsRequest
    } = this.props
    const { open } = this.state
    return (
      <React.Fragment>
        <Card display={open ? 'block' : 'none'}>
          Card
          <button onClick={this.handleConfirm}>Confirm Click</button>
        </Card>
        {people.map((person: any, index: any) => (
          <h4 key={index}>Person: {person.name}</h4>
        ))}
        {planets.map((planet: any, index: any) => (
          <h4 key={index}> Planet: {planet.name}</h4>
        ))}
        <button onClick={this.handleClick}>Load More</button>
      </React.Fragment>
    )
  }
}

export default Data

const Card: any = styled.section`
  display: ${(props: any) => props.display};
`
