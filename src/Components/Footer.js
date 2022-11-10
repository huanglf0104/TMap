import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as todoListActions from '../Store/Actions/todo-list'

class Footer extends Component {
  render() {
    const { todos } = this.props
    let items = todos.filter((v) => !v.isCompleted)
    return (
      todos.length !== 0 && (
        <footer className="footer">
          {/* <!-- 未完成任务数量 --> */}
          <span className="todo-count">
            <strong>{items.length}</strong> item left
          </span>
          {/* <!-- 任务状态筛选 --> */}
          <ul className="filters">
            <li>
              <span>All</span>
            </li>
            <li>
              <span>Active</span>
            </li>
            <li>
              <span>Completed</span>
            </li>
          </ul>
          {/* <!-- 如果没有已完成任务 隐藏下面的button按钮 --> */}
          <button
            className="clear-completed"
            onClick={this.props.clear_completed}
          >
            Clear completed
          </button>
        </footer>
      )
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
