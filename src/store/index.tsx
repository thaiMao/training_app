import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from 'reducers'
import { testSaga } from 'sagas'
import { Api } from 'helpers'

const sagaMiddleware = createSagaMiddleware()

export default createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(testSaga)
