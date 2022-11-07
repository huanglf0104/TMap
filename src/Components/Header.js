import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as todoListActions from '../Store/Actions/todo-list'

class Header extends Component {
  componentDidMount() {}
  addTodo = (e) => {
    if (e.code === 'Enter') {
      let taskName = e.target.value.trim()
      if (taskName.length === 0) {
        return alert('请输入任务名称')
      }
      this.props.add_todo(taskName)
      e.target.value = ''
    }
  }
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="还有什么任务没有完成?"
          autoFocus
          onKeyUp={this.addTodo}
        />
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('初始状态', state)
  return {
    todos: state.todoList.todos,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(todoListActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
