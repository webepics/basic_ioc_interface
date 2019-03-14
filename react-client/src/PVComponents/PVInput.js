
import React from 'react'
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';

import PVComponent, { ConnectComponent } from '../PVComponent'

class PVInput extends PVComponent {

    constructor(props) {
        super(props)
        this.state = { textValue: false, modalOpen: false };
        this.handleChange = this.handleChange.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    handleChange(event) {
        event.persist()
        const val = event.target.value;
        this.setState({textValue:val})
        this.forceUpdate();
    }
    handleBlur(event) {
        const {pvs, pv} = this.props;
        const pvValue = pvs[pv] && pvs[pv].value ? pvs[pv].value : "";
        if (this.state.textValue !== false && pvValue !== this.state.textValue) {
            //this.setState({modalOpen: true})
            if (window.confirm('Do you mean to leave?') === true) {
                this.state.textValue = pvValue;
                this.forceUpdate();

            }
        }
    }
    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.write(this.props.pv, this.state.textValue)()
        }
    }
    checked() {
        return (this.props.pvs[this.props.pv] && this.props.pvs[this.props.pv].value && this.props.pvs[this.props.pv].value !== 0) ? true : false
    }

    render() {
        const {pvs, pv} = this.props;
        const pvValue = pvs[pv] && pvs[pv].value ? pvs[pv].value : "";
        const title = `pv: ${pv} \nvalue: ${pvValue}`;
        const color = this.state.textValue !== false && pvValue !== this.state.textValue ? 'yellow' : '#90EE90';
        const val = this.state.textValue !== false && pvValue !== this.state.textValue ? this.state.textValue : pvValue;
        return (
        <React.Fragment>
        <TextField color='primary' title={title} style={{padding:"4px",backgroundColor:color}} value={val} onBlur={this.handleBlur} onKeyPress={this.handleKeyPress} onChange={this.handleChange}/>
        <Modal
            open={this.state.modalOpen}
            >
            <div>Do you want to discard your value?</div>
        </Modal>
        </React.Fragment>
        )

    }
}

export default ConnectComponent(PVInput)