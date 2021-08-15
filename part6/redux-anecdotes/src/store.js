import { createStore, combineReducers } from "redux"
import {composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import NotificationReducer from "./reducers/notificationReducer"

const reducer = combineReducers({
 anecdotes: anecdoteReducer,
 notification: NotificationReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

export default store
