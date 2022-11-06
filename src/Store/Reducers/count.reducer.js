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
      break;
    default:
      break;
  }
}

export default countReducer