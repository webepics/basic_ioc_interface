
import React from 'react'
import PVComponent, { ConnectComponent } from '../PVComponent'

class PVLed extends PVComponent {
    styles = {
        width: '1em',
        height: '1em',
        borderRadius: '50%',
        border: '1px solid white',
    }

    render() {
        return this.props.pvs[this.props.pv] && this.props.pvs[this.props.pv].value ? (
            <div title={`${this.props.pv}: ${this.props.pvs[this.props.pv].value}`} style={{ ...this.styles, background: 'limegreen' }}>
            </div>
        ) : (
            <div title={this.props.pv} style={{ ...this.styles, background: 'maroon' }}>
            </div>
        )
    }
}

export default ConnectComponent(PVLed)