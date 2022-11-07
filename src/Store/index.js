// 用于创建 store
import { createStore, applyMiddleware } from 'redux'
import rootReducers from './Reducers/index'
import rootSaga from './Saga'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleWare = createSagaMiddleware()

const store = createStore(rootReducers, applyMiddleware(sagaMiddleWare))

sagaMiddleWare.run(rootSaga)

export default store
