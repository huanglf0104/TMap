import axios from 'axios'
import { takeEvery, put } from 'redux-saga/effects'
import {
  todo_load,
  todo_load_success,
  add_todo,
  add_todo_success,
} from '../Actions/todo-list'

const base_url = 'http://localhost:3005/api'

/**
 * 1、执行异步操作
 * 2、重新发送指令
 */

//  1、执行异步操作
function* getTodoList() {
  // 获取数据
  const todoList = yield axios.get(`${base_url}/todos`).then((res) => res.data)
  // 2、重新发送指令
  yield put(todo_load_success(todoList))
}

function* todoListSaga() {
  yield takeEvery(todo_load, getTodoList)
}

function* add_todo_func(action) {
  let res = yield axios
    .post(`${base_url}/todos`, {
      taskName: action.payload,
    })
    .then((r) => r.data)
  yield put(add_todo_success(res.task))
}

function* addTodoFunc() {
  yield takeEvery(add_todo, add_todo_func)
}

export { todoListSaga, addTodoFunc }
