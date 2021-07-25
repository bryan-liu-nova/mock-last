import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import auth from './auth'
import { BrowserHistory } from 'history'

export default (history: BrowserHistory) => 
  combineReducers({
    auth,
    router: connectRouter(history)
  })