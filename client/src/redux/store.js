import { createStore, combineReducers } from "redux";

import { PV_INFO, PV_UPDATE } from './actions'


const pvs = (state = { 'default:i': 42 }, action) => {
    
    switch (action.type) {
        case PV_UPDATE:
        case PV_INFO: return {
                ...state,
                [action.pv.pv]: action.pv,
        }
        default: return state
    }
}

const rootReducer = combineReducers({
    pvs
})

export default createStore(rootReducer);
