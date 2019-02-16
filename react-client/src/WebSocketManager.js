import React, { Component } from 'react'
import { connect } from "react-redux";
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { PVMessage, PVMessages, WebSocketMessage } from "./redux/actions";
import ReadyState from './components/ReadyState.js'

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
        if (this.socket != null) {
            this.socket.close()
        }
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
            <FormControl onSubmit={e => e.preventDefault()} style={{color:'black',backgroundColor:'white', width: 500, padding: "0 50px", border: "1px solid black"}}>
                Host
                <TextField
                id="host"
                label="Host URL"
                value={this.props.url}
                onChange={this.onUrlChange}
                margin="normal"
                variant="outlined"
                />
                <Button variant="outlined" color="primary" onClick={this.connectWebSocket}>Connect</Button>
                <Typography variant="h5" color="inherit">
                Status: <ReadyState readyState={this.props.readyState} /><br />
                </Typography>
            </FormControl>
        )
    }
}

export default connect(state => state.websocket, { PVMessage, PVMessages, WebSocketMessage })(WebSocketManager)