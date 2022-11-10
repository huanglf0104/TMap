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

//双击显示编辑框编辑
export const edit_dbl = createAction('edit_dbl')
export const edit_dbl_success = createAction('edit_dbl_success')

// 提交编辑信息
export const edit_todo = createAction('edit_todo')
export const edit_todo_success = createAction('edit_todo_success')

// 更改任务状态(单个)
export const modify_status = createAction('modify_status')
export const modify_status_success = createAction('modify_status_success')

// 更改任务状态(批量)
export const modify_all_status = createAction('modify_all_status')
export const modify_all_status_success = createAction(
  'modify_all_status_success'
)

// 清楚已完成
export const clear_completed = createAction('clear_completed')
export const clear_completed_success = createAction('clear_completed_success')
