import React, { Component } from 'react'

import { connect } from "react-redux";
import { PVMessage, PVMessages, WebSocketMessage } from "./redux/actions";

const debounceTime = 250

class WebSocketManager extends Component {
    socket = null
    queue = []

    constructor(props) {
        super(props)
        this.onUrlChange = this.onUrlChange.bind(this)
        this.connectWebSocket = this.connectWebSocket.bind(this)
        this.sendMonitorMessage = this.sendMonitorMessage.bind(this)
        this.onData = this.onData.bind(this)
    }

    connectWebSocket() {
        if (this.socket != null) this.socket.close()
        console.log(`Attempting connection to: ${this.props.url}`)
        this.socket = new WebSocket(this.props.url)
        this.socket.onopen = () => {
            this.props.WebSocketMessage({type: 'readyState', state: this.socket.readyState})
            this.sendMonitorMessage(Object.keys(this.props.monitored))            
            this.forceUpdate()
        }
        this.socket.close = () => {
            this.props.WebSocketMessage({ type: 'readyState', state: this.socket.readyState })
            this.forceUpdate()
        }
        this.socket.onmessage = message => this.onData(JSON.parse(message.data))
        setInterval(() => {
            if (this.queue.length === 0) return
            this.props.PVMessages({
                type: 'many',
                pvs: this.queue,
            })
            this.queue = []
        }, debounceTime)
    }

    onUrlChange(event) {
        this.props.WebSocketMessage({type: 'url', state: event.target.value})
    }


    onData(data) {
        this.queue.push(data)
    }


    sendMonitorMessage(monitored) {
        const message = {
            type: "monitor",
            pvs: monitored
        }
        this.socket.send(JSON.stringify(message))
    }

    render() {
        return (
            <form onSubmit={e => e.preventDefault()}>
                <label htmlFor="host" >Host</label><br />
                <input type="text" name="host" onChange={this.onUrlChange} value={this.props.url} style={{ width: '50em' }} /><br />
                <button onClick={this.connectWebSocket}>Connect</button><br />
                <ReadyState readyState={this.props.readyState} /><br />
            </form>
        )
    }
}

function ReadyState(props) {
    if (props.readyState === 0) return 'Connecting'
    if (props.readyState === 1) return 'Connected'
    if (props.readyState === 2) return 'Disconnecting'
    if (props.readyState === 3) return 'Disconnected'
    return 'Error'
}

export default connect(state => state.websocket, { PVMessage, PVMessages, WebSocketMessage })(WebSocketManager)