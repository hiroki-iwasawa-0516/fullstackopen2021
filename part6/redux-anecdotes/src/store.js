import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import {composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import NotificationReducer from "./reducers/notificationReducer"

const reducer = combineReducers({
 anecdotes: anecdoteReducer,
 notification: NotificationReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
