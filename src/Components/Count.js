import React, { Component } from "react";
import { connect } from "react-redux";
import * as CountActions from '../Store/Actions/count.actions'

class Count extends Component {
  render () {
    const { count } = this.props
    return (
      <div style={{ margin: '0 50%', width: '100%' }}>
        <button>+1</button>
        <div>{count}</div>
        <button>-1</button>
      </div>
    )
  }
}

// 获取store初始状态
const mapStateToProps = (state, action) => {
  return {
    count: state
  }
}

export default connect(mapStateToProps)(Count);