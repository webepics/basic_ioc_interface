export const PV_INFO = 'info'
export const PV_UPDATE = 'update'


export const PVMessage = pv => ({
    type: pv.type,
    pv
})