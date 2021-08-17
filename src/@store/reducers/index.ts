import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import artists from './artists'
import { BrowserHistory } from 'history'

const browserHistory = (history: BrowserHistory) => 
  combineReducers({
    artists,
    router: connectRouter(history)
  })

export default browserHistory;