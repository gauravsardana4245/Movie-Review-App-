import { combineReducers } from 'redux'
import reviewReducer from './reviewReducer'

const reducers = combineReducers({
    review: reviewReducer
})

export default reducers