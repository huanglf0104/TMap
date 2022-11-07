import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as todoListActions from '../Store/Actions/todo-list'
import cx from 'classnames'

class Main extends Component {
  componentDidMount() {
    this.props.todo_load()
  }

  render() {
    const { todos } = this.props
    return (
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <ul className="todo-list">
          {/* 当任务处于编辑状态时 添加editing类名、当任务处于已完成状态时 添加completed类名 */}
          {todos.map((todo) => {
            return (
              <li
                className={cx(
                  todo.isCompleted ? 'completed' : '',
                  todo.isEditing ? 'editing' : ''
                )}
                key={todo.id}
              >
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.isCompleted}
                  />
                  <label>{todo.taskName}</label>
                  <button className="destroy"></button>
                </div>
                <input className="edit" value="Create a TodoMVC template" />
              </li>
            )
          })}
        </ul>
      </section>
    )
  }
}

// 获取初始状态
const mapStateToProps = (state) => {
  return {
    todos: state.todoList.todos,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(todoListActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
