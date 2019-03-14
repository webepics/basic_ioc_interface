
import React from 'react'
import TextField from '@material-ui/core/TextField';

import PVComponent, { ConnectComponent } from '../PVComponent'

class PVInput extends PVComponent {

    constructor(props) {
        super(props)
        this.state = { textValue : "" };
        this.handleChange = this.handleChange.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.checked = this.checked.bind(this)
    }

    handleChange(event) {
        event.persist()
        const val = event.target.value;
        this.setState({textValue:val})
        this.forceUpdate();
    }
    handleBlur(event) {
        this.write(this.props.pv, this.state.textValue)()
    }
    checked() {
        return (this.props.pvs[this.props.pv] && this.props.pvs[this.props.pv].value && this.props.pvs[this.props.pv].value !== 0) ? true : false
    }

    render() {
        const {pvs, pv} = this.props;
        const pvValue = pvs[pv] && pvs[pv].value ? pvs[pv].value : "";
        const title = `pv: ${pv} \nvalue: ${pvValue}`;
        const color = this.state.textValue !== "" && pvValue != this.state.textValue ? 'yellow' : '#90EE90';
        const val = this.state.textValue !== "" && pvValue != this.state.textValue ? this.state.textValue : pvValue;
        return <TextField color='primary' title={title} style={{padding:"4px",backgroundColor:color}} value={val} onBlur={this.handleBlur} onChange={this.handleChange}/>
    }
}

export default ConnectComponent(PVInput)