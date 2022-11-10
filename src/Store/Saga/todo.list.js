import axios from 'axios'
import { takeEvery, put } from 'redux-saga/effects'
import {
  todo_load,
  todo_load_success,
  add_todo,
  add_todo_success,
  delete_todo,
  delete_todo_success,
  edit_dbl,
  edit_dbl_success,
  edit_todo,
  edit_todo_success,
  modify_status,
  modify_status_success,
  modify_all_status,
  modify_all_status_success,
  clear_completed,
  clear_completed_success,
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

// 添加todo
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

// 删除todo
function* delete_todo_func(action) {
  let res = yield axios
    .delete(`${base_url}/todos`, { params: action.payload })
    .then((res) => res.data)
  yield put(delete_todo_success(res.tasks))
}

function* deleteTodoFunc() {
  yield takeEvery(delete_todo, delete_todo_func)
}

// 编辑框
function* edit_dbl_Func(action) {
  // let index = action.payload
  let res = yield axios.put(`${base_url}/todos/isEditing`, action.payload)
  yield put(edit_dbl_success(res.data.task))
}

function* editDblFunc() {
  yield takeEvery(edit_dbl, edit_dbl_Func)
}

//提交编辑数据
function* edit_todo_func(action) {
  let res = yield axios.put(`${base_url}/todos`, action.payload)
  yield put(edit_todo_success(res.data.task))
}

function* editTodoFunc() {
  yield takeEvery(edit_todo, edit_todo_func)
}

// 更改任务状态(单个)
function* modify_status_func(action) {
  let res = yield axios.put(`${base_url}/todos/isCompleted`, action.payload)
  yield put(modify_status_success(res.data.task))
}

function* modifyStatusFunc() {
  yield takeEvery(modify_status, modify_status_func)
}

// 更改任务状态(批量)
function* modify_all_status_func(action) {
  let res = yield axios.put(`${base_url}/todos/allCompleted`, action.payload)
  yield put(modify_all_status_success(res.data))
}

function* modifyAllStatusFunc() {
  yield takeEvery(modify_all_status, modify_all_status_func)
}

// 清楚已完成
function* clear_completed_func() {
  let res = yield axios.delete(`${base_url}/todos/clearCompleted`)
  yield put(clear_completed_success(res.data.taskList))
}

function* clearCompletedFunc() {
  yield takeEvery(clear_completed, clear_completed_func)
}

export {
  todoListSaga,
  addTodoFunc,
  deleteTodoFunc,
  editDblFunc,
  editTodoFunc,
  modifyStatusFunc,
  modifyAllStatusFunc,
  clearCompletedFunc,
}
