import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as countActions from '../Store/Actions/count.actions'

class Count extends Component {

  render () {
    return (
      <div style={{ margin: '0 50%', width: '100%' }}>
        <button onClick={this.props.increment}>+1</button>
        <div>{this.props.count}</div>
        <button onClick={this.props.decrement}>-1</button>
        <br />
        <button onClick={() => this.props.increment_n(5)}>+5</button>
      </div>
    )
  }
}

// 获取store初始状态
const mapStateToProps = (state) => {
  return {
    count: state.countReducer.count
  }
}

// 修改 store 数据
// bindActionCreators 自定生成 Actions 函数
const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(countActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Count);