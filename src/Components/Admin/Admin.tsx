import React, { Component } from 'react'
import { SendPushNotification } from 'Components/Admin'
import { Fetch } from 'app-utils'

interface Props {}

function handleOnSubmit(notification: any): void {
  const init = Fetch.postJSONOptions(JSON.stringify(notification))
  Fetch.sendPushMessage(init)
}

class Admin extends Component<Props> {
  public render() {
    return (
      <React.Fragment>
        <h1>Admin Page</h1>
        <SendPushNotification onSubmit={handleOnSubmit} />
      </React.Fragment>
    )
  }
}

export default Admin
