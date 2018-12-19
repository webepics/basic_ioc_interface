import { createStore, combineReducers } from "redux";

import { PV_INFO, PV_UPDATE } from './actions'


const pvs = (state = { }, action) => {
    
    switch (action.type) {
        case PV_UPDATE:
            return {
                ...state,
                [action.pv.pv]: action.pv,
            }
        case PV_INFO: return {
                ...state,
                [action.pv.pv]: action.pv,
        }
        default: return state
    }
}

const history = (state = {}, action) => {
    if(!action.pv) return state
    if (!state[action.pv.pv]) state[action.pv.pv] = []
    switch (action.type) {
        case PV_UPDATE:
            state[action.pv.pv].push(action.pv)
            return state
        default: return state
    }
}

const rootReducer = combineReducers({
    pvs,
    history
})

export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
