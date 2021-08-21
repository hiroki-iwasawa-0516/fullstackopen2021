
const initialState = ''

let timeoutID = null

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SET':
      return action.data.content
    default:
      return state
  }
}

export const setNotification = (content, second) => {
  return dispatch => {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    dispatch({
      type: 'SET',
      data: {
        content
      }
    })
    timeoutID = setTimeout(() => {
      timeoutID = null
      dispatch({
        type: 'SET',
        data: { content: '' }
      })
    }, second * 1000)
  }
}

export default reducer
