import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
// import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'


const history = history || createBrowserHistory();

const initialState = {
}


const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history)
  //   routerMiddleware(history)
]

let bikes = function (state = { bikeList: [], filters: [], singleBike: {} }, action) {
  switch (action.type) {
    case 'LOAD_BIKES': {
      return { ...state, bikeList: [...action.payload] }
    }
    case 'LOAD_SINGLE_BIKE': {
      return { ...state, singleBike: action.payload }
    }
    case 'LOAD_FILTERS': {
      // debugger;
      return { ...state, filters: [...action.payload] }
    }
    default: {
      return state
    }
  }
}

let rootReducer = combineReducers({
  bikes
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composedEnhancers = composeEnhancers(
  applyMiddleware(...middleware)
  // ...enhancers
)

const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composedEnhancers
)

export default store