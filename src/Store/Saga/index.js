import { all } from 'redux-saga/effects'
import { todoListSaga, addTodoFunc, deleteTodoFunc } from './todo.list'

function* rootSaga () {
  yield all([todoListSaga(), addTodoFunc(), deleteTodoFunc()])
}

export default rootSaga
