import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider, ReactReduxContext } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react'
import createStore from '@store'

import Home from '@screens/home'
import '@styles/index.scss'

const { store, persistor, history } = createStore()

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Home} />
      </Router>
    </div>
  )
}

const Container = () => (
  <Provider store={store} context={ReactReduxContext}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history} context={ReactReduxContext}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>
)

export default Container
