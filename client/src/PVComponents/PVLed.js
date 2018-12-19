import React from 'react'
import { connect } from 'react-redux'

const styles = {
    width: '1em',
    height: '1em',
    borderRadius: '50%',
    border: '1px solid white',
}

let PVLed = ({pvs, pvId}) =>
    pvs[pvId] && pvs[pvId].value  ? (
        <div style={{...styles, background: 'green'}}>
        </div>
    ) : (
        <div style={{ ...styles, background: 'red' }}>
        </div>
    )

PVLed = connect(state => state)(PVLed)
export default PVLed