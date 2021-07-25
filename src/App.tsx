import { BrowserRouter } from 'react-router-dom'
import { Provider, ReactReduxContext } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react'
import createStore from '@store'
import { renderRoutes } from 'react-router-config'

import routes from '@config/routes'
import '@styles/index.scss'

const { store, persistor, history } = createStore()

const App = () => {
  console.log(routes('admin'))
  console.log(routes, 'this is routes');
  return (
    <div className="App">
        {/* <ScrollToTop /> */}
        <BrowserRouter>
          {renderRoutes(routes('admin') as any)}
        </BrowserRouter>
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
