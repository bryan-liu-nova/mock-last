import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// @ts-ignore
import { seamlessImmutableReconciler, seamlessImmutableTransformCreator } from 'redux-persist-seamless-immutable'
import { createMemoryHistory, createBrowserHistory } from 'history'

import createRootReducer from '@store/reducers'
import rootSaga from '@store/sagas'

const transformerConfig = {
  whitelistPerReducer: {}
}

const persistConfig = {
  key: 'bam',
  storage,
  whitelist: ['auth'],

  stateReconciler: seamlessImmutableReconciler,
  transforms: [seamlessImmutableTransformCreator(transformerConfig)]
}

const history =
  process.env.NODE_ENV === 'test'
    ? createMemoryHistory({ initialEntries: ['/'] })
    : createBrowserHistory()

export default () => {
  const middleware = [thunkMiddleware, routerMiddleware(history)]

  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  let enhancer = applyMiddleware(...middleware)

  const persistedReducer = persistReducer(
    persistConfig,
    createRootReducer(history)
  )

  const store = createStore(persistedReducer, enhancer)

  const persistor = persistStore(store)

  sagaMiddleware.run(rootSaga)

  return { store, persistor, history }
}
