
import React from 'react'
import PVComponent, { ConnectComponent } from '../PVComponent'
import Checkbox from '@material-ui/core/Checkbox';

class PVCheckbox extends PVComponent {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.checked = this.checked.bind(this)
    }

    handleChange(event) {
        event.persist()
        console.log(event.target.checked)
        console.log(`${this.props.pv}: ${event.target.checked ? 1 : 0}`)
        this.write(this.props.pv, event.target.checked ? 1 : 0)()
    }
    checked() {
        return (this.props.pvs[this.props.pv] && this.props.pvs[this.props.pv].value && this.props.pvs[this.props.pv].value !== 0) ? true : false
    }

    render() {
        const title = "pv: " + this.props.pv + (this.props.pvs[this.props.pv] && this.props.pvs[this.props.pv].value ?
            "\nvalue: " + this.props.pvs[this.props.pv].value :
            "");
        return <Checkbox color="primary" title={title} style={{padding:"4px"}} value={this.props.pv} checked={this.checked()} onChange={this.handleChange}/>
    }
}

export default ConnectComponent(PVCheckbox)