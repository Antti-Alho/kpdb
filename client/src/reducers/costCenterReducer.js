import ccService from '../services/costCenterService'
import { stringToNumber, centsToEuro } from '../util/currencyConverter'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_CC':
      let indexToUpdate = state.findIndex(cc => cc.id === action.data.id)
      state[indexToUpdate] = action.data
      return state
    case 'NEW_CC':
      return state.concat(action.data)
    case 'INIT_CC_LIST':
      return action.data
    case 'DELETE_CC':
      return state.filter(cc => cc.id !== action.data)
    default: return state
  }
}

export const updateOne = (id, content) => {
  return async dispatch => {
    let costCenter = await ccService.getOne(id)
    costCenter = Object.assign(costCenter, content)
    costCenter.budget = stringToNumber(costCenter.budget)
    costCenter.actual = stringToNumber(costCenter.actual)
    await ccService.update(id, costCenter)
    dispatch({
      type: 'UPDATE_CC',
      data: costCenter,
    })
  }
}

export const deleteOne = (id) => {
  return async dispatch => {
    try {
      await ccService.deleteOne(id)
      dispatch({
        type: 'DELETE_CC',
        data: id
      })
    } catch (error) {
      
    }
  }
}

export const createOne = (content) => {
  return async dispatch => {
    try {
      content.actual = stringToNumber(content.actual)
      content.budget = stringToNumber(content.budget)
      const costCenter = await ccService.create(content)
      costCenter.budget = centsToEuro(costCenter.budget)
      costCenter.actual = centsToEuro(costCenter.actual)
      dispatch({
        type: 'NEW_CC',
        data: costCenter,
      })
    } catch (error) {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: {
          notification: 'backend validation failed',
          type: 'error',
          time: 5
        }
      })
    }

  }
}

export const init = () => {
  return async dispatch => {
    const costCenters = await ccService.getAll()
    costCenters.forEach(element => {
      element.budget = (element.budget / 100).toString() + '€'
      element.actual = (element.actual / 100).toString() + '€'
     });
    dispatch({
      type: 'INIT_CC_LIST',
      data: costCenters,
    })
  }
}

export default reducer