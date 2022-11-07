import { all } from 'redux-saga/effects'
import { todoListSaga, addTodoFunc } from './todo.list'

function* rootSaga() {
  yield all([todoListSaga(), addTodoFunc()])
}

export default rootSaga
