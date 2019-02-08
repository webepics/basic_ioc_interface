
import PVComponent, { ConnectComponent } from '../PVComponent'

class PVRaw extends PVComponent {
    render() {
        if (!this.props.pvs[this.props.pv]) return ''
        return this.props.pv + ' = ' + this.props.pvs[this.props.pv].value
    }
}

export default ConnectComponent(PVRaw)
