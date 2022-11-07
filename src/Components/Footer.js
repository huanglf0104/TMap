import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <footer className="footer">
        {/* <!-- 未完成任务数量 --> */}
        <span className="todo-count">
          <strong>0</strong> item left
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
        <button className="clear-completed">Clear completed</button>
      </footer>
    )
  }
}

export default Header
