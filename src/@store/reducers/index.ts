import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import services from './services'
import { BrowserHistory } from 'history'

export default (history: BrowserHistory) => 
  combineReducers({
    services,
    router: connectRouter(history)
  })