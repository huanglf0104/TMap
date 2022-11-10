import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as todoListActions from '../Store/Actions/todo-list'
import cx from 'classnames'

class Main extends Component {
  constructor() {
    super()
    this.editRef = createRef()
  }

  componentDidMount() {
    this.props.todo_load()
  }

  handleDelete = (params) => {
    // console.log('删除操作', this.props, params)
    this.props.delete_todo(params)
  }

  handleEdit = (params) => {
    this.props.edit_dbl(params)
    this.editRef.current.focus()
  }

  handleBlur = (params, e) => {
    this.props.edit_dbl(params)
  }

  handleKeyUp = (params, e) => {
    let taskName = e.target.value
    if (e.code === 'Enter') {
      if (taskName.trim().length === 0) {
        alert('请输入任务名称')
        return
      }
      this.props.edit_todo({ ...params, taskName })
    }
  }

  handleStatus = (params, e) => {
    this.props.modify_status(params)
  }

  handleAllStatus = (e) => {
    this.props.modify_all_status({ status: e.target.checked })
  }

  render() {
    const { todos } = this.props
    let isAllChecked = todos.map((v) => v.isCompleted).indexOf(false) === -1
    return (
      <section className="main">
        <input
          className="toggle-all"
          type="checkbox"
          checked={isAllChecked}
          onClick={(e) => this.handleAllStatus(e)}
        />
        <ul className="todo-list">
          {/* 当任务处于编辑状态时 添加editing类名、当任务处于已完成状态时 添加completed类名 */}
          {todos.map((todo, index) => {
            return (
              <li
                className={cx(
                  todo.isCompleted ? 'completed' : '',
                  todo.isEditing ? 'editing' : ''
                )}
                key={todo.id}
                onDoubleClick={() =>
                  this.handleEdit({ id: todo.id, isEditing: true })
                }
              >
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.isCompleted}
                    onClick={(e) =>
                      this.handleStatus(
                        { id: todo.id, isCompleted: !todo.isCompleted },
                        e
                      )
                    }
                  />
                  <label>{todo.taskName}</label>
                  <button
                    className="destroy"
                    onClick={() => this.handleDelete({ id: todo.id })}
                  ></button>
                </div>
                <input
                  ref={this.editRef}
                  className="edit"
                  defaultValue={todo.taskName}
                  autoFocus
                  onBlur={(e) =>
                    this.handleBlur({ id: todo.id, isEditing: false }, e)
                  }
                  onKeyUp={(e) => this.handleKeyUp({ id: todo.id }, e)}
                />
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
