import { all } from 'redux-saga/effects'
import {
  todoListSaga,
  addTodoFunc,
  deleteTodoFunc,
  editDblFunc,
  editTodoFunc,
  modifyStatusFunc,
  modifyAllStatusFunc,
  clearCompletedFunc,
} from './todo.list'

function* rootSaga() {
  yield all([
    todoListSaga(),
    addTodoFunc(),
    deleteTodoFunc(),
    editDblFunc(),
    editTodoFunc(),
    modifyStatusFunc(),
    modifyAllStatusFunc(),
    clearCompletedFunc(),
  ])
}

export default rootSaga
