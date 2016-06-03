export const SHOW = 'LOADING-BAR/SHOW'
export const HIDE = 'LOADING-BAR/HIDE'

export function showLoading() {
  return {
    type: SHOW,
  }
}

export function hideLoading() {
  return {
    type: HIDE,
  }
}

export function loadingBarReducer(state = false, action = {}) {
  var newState

  switch (action.type) {
    case SHOW:
      newState = true
      break
    case HIDE:
      newState = false
      break
    default:
      return state
  }

  return newState
}
