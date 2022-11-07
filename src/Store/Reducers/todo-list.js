import { handleActions as createReducer } from 'redux-actions'
import {
  todo_load,
  todo_load_success,
  add_todo,
  add_todo_success,
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
  },
  initialState
)
