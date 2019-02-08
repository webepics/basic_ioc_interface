import { Component } from 'react'
import { WebSocketMessage } from './redux/actions'
import { connect } from 'react-redux'

class PVComponent extends Component {

    componentDidMount() {
        this.props.WebSocketMessage({ type: 'addPV', name: this.props.pv })
    }

    componentWillUnmount() {
        this.props.WebSocketMessage({ type: 'removePV', name: this.props.pv })
    }

    write(pv, value) {
        return () => {
            if (pv === undefined || value === undefined ) return
            const url = `${this.props.http.put_url}?pv=${pv}&value=${value}`
            fetch(url, {
                method: 'POST',
            })
            .catch(console.error)
        }
    }
}
export const ConnectState = (state, ownProps) => ({ pvs: state.pvs, http: state.http, ...ownProps })
export const ConnectDispatch = { WebSocketMessage }

export const ConnectComponent = connect(ConnectState, ConnectDispatch)

export default PVComponent
