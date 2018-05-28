import React, { Component } from 'react'
import styled from 'styled-components'

interface Props {
  onSubmit: any
}

class SendPushNotification extends Component<Props> {
  public render() {
    return (
      <form
        onSubmit={(event: any) => {
          const { onSubmit } = this.props
          const {
            target: {
              elements: { title, message }
            }
          } = event
          event.preventDefault()
          onSubmit({ title: title.value, body: message.value })
        }}
      >
        <label htmlFor="title">Title</label>
        <input id="title" name="title" />
        <br />
        <label htmlFor="message">Message</label>
        <input id="message" name="message" />
        <br />
        <Button type="submit">PUSH</Button>
      </form>
    )
  }
}

export default SendPushNotification

const Button = styled.button`
  color: blue;
  &&:hover {
    cursor: pointer;
  }
`
