
import { createStore, combineReducers } from "redux";
import * as Actions from './actions'

const defaultState = {
    websocket: {
        url: 'ws://localhost:8080/epics2web/monitor',
        monitored: {},
        readyState: 3,
    },
    http: {
        put_url: 'http://localhost:8081/put',
    },
    pvs: {},
}

const pvs = (state = defaultState.pvs, action) => {
    switch (action.type) {
        case Actions.PV_UPDATE: return {
            ...state,
            [action.pv.pv]: action.pv,
        }
        case Actions.PV_INFO: return {
            ...state,
            [action.pv.pv]: action.pv,
        }
        case Actions.PV_MANY:
        const thisState = {...state}
            action.pvs.forEach(pv => {
                thisState[pv.pv] = {
                    ...thisState[pv.pv],
                    ...pv
                }
            })
            return thisState
        default: return state
    }
}

const websocket = (state = defaultState.websocket, action) => {
    switch (action.type) {
        case Actions.WS_URL: return {
            ...state,
            url: action.state,
        }
        case Actions.WS_READY: return {
            ...state,
            readyState: action.state
        }
        case Actions.WS_MONITOR: 
        if (!action || !action.name) return state
        else return {
            ...state,
            monitored: {
                ...state.monitored,
                [action.name]: state.monitored[action.name] + 1 || 1
            }
        }
        case Actions.WS_UNMONITOR: return {
            ...state,
            monitored: {
                ...state.monitored,
                [action.name]: state.monitored[action.name] - 1 === 0 ? null : state.monitored[action.name] - 1
            }
        }
        default: return state
    }
}

const http = (state = defaultState.http, action) => {
    return state
}

const rootReducer = combineReducers({
    pvs,
    websocket,
    http
})

export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);