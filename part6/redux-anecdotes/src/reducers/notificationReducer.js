
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

export const setNotification = (content) => {
  return {
    type: 'SET',
    data: {
      content
    }
  }
}

export default reducer
