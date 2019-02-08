export const PV_INFO = 'info'
export const PV_UPDATE = 'update'
export const PV_MANY = 'many'
export const WS_URL = 'url'
export const WS_READY = 'readyState'
export const WS_MONITOR = 'addPV'
export const WS_UNMONITOR = 'removePV'

export const PVMessage = pv => ({
    type: pv.type,
    pv
})

export const PVMessages = action => action

export const WebSocketMessage = ws => ws