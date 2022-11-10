import { handleActions as createReducer } from 'redux-actions'
import {
  todo_load_success,
  add_todo_success,
  delete_todo_success,
  edit_dbl_success,
  edit_todo_success,
  modify_status_success,
  modify_all_status_success,
  clear_completed_success,
} from '../Actions/todo-list'

// 初始值
const initialState = {
  todos: [],
}

export default createReducer(
  {
    [todo_load_success]: (state, action) => ({
      todos: action.payload,
    }),
    [add_todo_success]: (state, action) => {
      return {
        todos: [...state.todos, action.payload],
      }
    },
    [delete_todo_success]: (state, action) => {
      return {
        todos: action.payload,
      }
    },
    [edit_dbl_success]: (state, action) => {
      let cloneTodos = JSON.parse(JSON.stringify(state.todos))
      let index = cloneTodos.findIndex((v) => v.id === action.payload.id)
      cloneTodos.splice(index, 1, action.payload)

      return {
        todos: [...cloneTodos],
      }
    },
    [edit_todo_success]: (state, action) => {
      action.payload.isEditing = false
      let cloneTodos = JSON.parse(JSON.stringify(state.todos))
      let index = cloneTodos.findIndex((v) => v.id === action.payload.id)
      cloneTodos.splice(index, 1, action.payload)
      return {
        todos: [...cloneTodos],
      }
    },
    [modify_status_success]: (state, action) => {
      let cloneTodos = JSON.parse(JSON.stringify(state.todos))
      let index = cloneTodos.findIndex((v) => v.id === action.payload.id)
      cloneTodos.splice(index, 1, action.payload)

      return {
        todos: [...cloneTodos],
      }
    },
    [modify_all_status_success]: (state, action) => {
      return {
        todos: [...action.payload],
      }
    },
    [clear_completed_success]: (state, action) => {
      console.log(state, action)
      return {
        todos: [...action.payload],
      }
    },
  },
  initialState
)
