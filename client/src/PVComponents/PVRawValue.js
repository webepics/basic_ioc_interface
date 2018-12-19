import React from 'react'
import { connect } from 'react-redux'

let PVRawValue = ({ dispatch, pvs, pvId }) => 
    pvs[pvId] ? (
        <div>
            { pvs[pvId].value }
        </div>
    ) : 'null'
    
PVRawValue = connect(state => state)(PVRawValue)

export default PVRawValue