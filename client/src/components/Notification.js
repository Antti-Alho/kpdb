import React from 'react'
import { useSelector } from 'react-redux'
import { Message } from 'rsuite';

const Notification = () => {

  const state = useSelector(state => state.notification)

  if (!state.notification) {
    return null
  }

  return (
    <div>
      <Message
        closable
        type={state.type}
        description={state.notification}
      />
    </div>
  )
}

export default Notification