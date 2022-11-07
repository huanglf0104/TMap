import { createAction } from 'redux-actions'

// todos 列表
export const todo_load = createAction('todo_load')
export const todo_load_success = createAction('todo_load_success')

// 添加todo
export const add_todo = createAction('add_todo')
export const add_todo_success = createAction('add_todo_success')

// 删除todo
export const delete_todo = createAction('delete_todo')
export const delete_todo_success = createAction('delete_todo_success')
