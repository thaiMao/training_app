import { SendPushNotification } from '../../../src/Components/Admin'
import {
  render,
  renderIntoDocument,
  fireEvent,
  cleanup,
  Simulate
} from 'react-testing-library'
import React from 'react'
import 'jest-styled-components'

const fakePushNotification = {
  title: 'This is a test title',
  body: 'This is a test message'
}

describe('<SendPushNotification />', () => {
  afterEach(cleanup)

  test('Click event on push btn is handled by handleSubmit fn', () => {
    const handleSubmit = jest.fn()
    const { container, getByText, getByLabelText } = renderIntoDocument(
      <SendPushNotification onSubmit={handleSubmit} />
    )
    const titleNode: any = getByLabelText('Title')
    const messageNode: any = getByLabelText('Message')
    const formNode = container.querySelector('form')
    const submitButtonNode: any = getByText('PUSH')

    titleNode.value = 'This is a test title'
    messageNode.value = 'This is a test message'

    fireEvent.click(submitButtonNode)

    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(handleSubmit).toHaveBeenCalledWith(fakePushNotification)
  })
})
