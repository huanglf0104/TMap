let initiallValue = {
  count: 0
}

// 创建 reducer 函数， 处理 Action 行为函数
const countReducer = (state = initiallValue, action) => {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + 1
      }
    case 'decrement':
      return {
        count: state.count - 1
      }
    case 'increment_n':
      return {
        count: state.count + action.payload
      }
    default:
      return state
  }
}

export default countReducer