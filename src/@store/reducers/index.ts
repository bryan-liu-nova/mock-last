import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import services from './services'
import { BrowserHistory } from 'history'

const browserHistory = (history: BrowserHistory) => 
  combineReducers({
    services,
    router: connectRouter(history)
  })

export default browserHistory;