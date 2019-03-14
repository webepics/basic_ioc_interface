
import React from 'react'
import Button from '@material-ui/core/Button';

import PVComponent, { ConnectComponent } from '../PVComponent'

class PVButton extends PVComponent {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        event.persist()
        this.write(this.props.pv, this.props.newValue)()
        
    }

    render() {
        const {pvs, pv} = this.props;
        const pvValue = pvs[pv] && pvs[pv].value ? pvs[pv].value : "";
        const title = `pv: ${pv} \nvalue: ${pvValue}`;
        const buttonText = this.props.children ? this.props.children : `set ${this.props.pv} to ${this.props.newValue}`;
        return <Button variant="outlined" color="primary" onClick={this.handleChange} value={pv}> {buttonText} </Button>
    }
}

export default ConnectComponent(PVButton)