let lastNotificationID

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    default: return state
  }
}

export const setNotification = (notification, type, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { 
        notification: notification,
        type: type,
      },
    })
    if (lastNotificationID) {
      clearTimeout(lastNotificationID)
    }
    lastNotificationID = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: { notification: '', type: '' },
      })
    }, time * 1000)
  }
}


export default reducer