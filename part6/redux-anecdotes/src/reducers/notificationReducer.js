
const initialState = ''

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
    dispatch({
      type: 'SET',
      data: {
        content
      }
    })
    setTimeout(() => dispatch({
      type: 'SET',
      data: {content: ''}
    }), second * 1000)
  }
}

export default reducer
