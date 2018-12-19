import React, { Component } from 'react'

import { connect } from "react-redux";
import { PVMessage } from "./redux/actions";

class WebSocketManager extends Component {
    socket = null

    constructor(props) {
        super(props)
        this.onUrlChange = this.onUrlChange.bind(this)
        this.connectWebSocket = this.connectWebSocket.bind(this)
        this.sendMonitorMessage = this.sendMonitorMessage.bind(this)
        this.onData = this.onData.bind(this)

        this.state = {
            url: 'ws://localhost:8080/epics2web/monitor'
        }
    }

    connectWebSocket() {
        if (this.socket != null) this.socket.close()
        console.log(`Attempting connection to: ${this.state.url}`)
        this.socket = new WebSocket(this.state.url)
        this.socket.onopen = () => {
            this.forceUpdate()
            this.sendMonitorMessage()
        }
        this.socket.close = () => this.forceUpdate()
        this.socket.onmessage = message => this.onData(JSON.parse(message.data))
    }

    onUrlChange(event) {
        this.setState({
            ...this.state,
            url: event.target.value,
        })
    }


    onData(data) {
        this.props.PVMessage(data)
    }


    sendMonitorMessage() {
        const message = {
            type: "monitor",
            pvs: [
                'simple:A',
                'simple:B',
                'random_walk:x',
                'random_walk:dt',
            ]
        }
        this.socket.send(JSON.stringify(message))
    }

    render() {
        return (
            <form onSubmit={e => e.preventDefault()}>
                <label htmlFor="host" >Host</label><br />
                <input type="text" name="host" onChange={this.onUrlChange} value={this.state.url}/><br />
                <button onClick={this.connectWebSocket}>Connect</button><br />
                <ReadyState socket={this.socket} /><br />
            </form>
        )
    }

}

function ReadyState(props) {
    if (props.socket == null || props.socket.readyState === 3) return 'Disconnected'
    if (props.socket.readyState === 0) return 'Connecting'
    if (props.socket.readyState === 1) return 'Connected'
    if (props.socket.readyState === 2) return 'Disconnecting'
    return 'Error'
}

export default connect(null, { PVMessage })(WebSocketManager)