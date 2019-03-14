
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
        console.log("button pressed :) !!!" ) 
        console.log(`${this.props.pv}`)
    }

    render() {
        const {pvs, pv} = this.props;
        const pvValue = pvs[pv] && pvs[pv].value ? pvs[pv].value : "";
        const title = `pv: ${pv} \nvalue: ${pvValue}`;
        return <Button variant="outlined" color="primary" onClick={this.handleChange} value={pv} >Button {pv} </Button>
    }
}

export default ConnectComponent(PVButton)