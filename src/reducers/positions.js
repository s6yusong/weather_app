const positionState = ['Beijing', 'Tokyo']

const positionReducer = (state = positionState, action) => {
  switch (action.type) {
    case 'UPDATE_SAVED_POSITIONS': {
      const data = action.payload;
      return data
    }
    default:
      return state;
  }
}

export default positionReducer;