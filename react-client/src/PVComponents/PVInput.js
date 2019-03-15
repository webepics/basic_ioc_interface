
import React from 'react'
import TextField from '@material-ui/core/TextField';

import DiscardDialog from '../components/DiscardDialog'
import PVComponent, { ConnectComponent } from '../PVComponent'

// TODO Move the dialog to the PV Table level ?
class PVInput extends PVComponent {
    constructor(props) {
        super(props)
        this.state = { textValue: false, dialogOpen: false };
        this.handleChange = this.handleChange.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleDialogClose = this.handleDialogClose.bind(this)
        this.handleDialogDiscard = this.handleDialogDiscard.bind(this)
    }

    handleDialogClose = () => {
        this.setState({ dialogOpen: false });
    }

    handleDialogDiscard = () => {
        this.setState({textValue: this.getPvValue(), dialogOpen: false })
    }

    handleChange(event) {
        event.persist()
        const val = event.target.value;
        this.setState({textValue: val})
        this.forceUpdate();
    }

    handleBlur(event) {
        if (this.isValueNotMatch()) {
            this.setState({dialogOpen: true})
        }
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.write(this.props.pv, this.state.textValue)()
        }
    }

    getPvValue() {
        const {pvs, pv} = this.props;
        return pvs[pv] && pvs[pv].value ? pvs[pv].value : "";
    }

    isValueNotMatch() {
        // TODO make this work for non int checks as well
        return this.state.textValue !== false && this.getPvValue() !== parseInt(this.state.textValue)
    }

    render() {
        const {pv} = this.props;
        const pvValue = this.getPvValue()
        const title = `pv: ${pv} \nvalue: ${pvValue}`;
        const color = this.isValueNotMatch() ? 'yellow' : '#90EE90';
        const val = this.isValueNotMatch() ? this.state.textValue : pvValue;
        return (
        <React.Fragment>
        <TextField
            color='primary'
            title={title}
            style={{padding:"4px",backgroundColor:color}}
            value={val}
            onBlur={this.handleBlur}
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChange}/>
        <DiscardDialog
            open={this.state.dialogOpen}
            handleClose={this.handleDialogClose}
            handleDiscard={this.handleDialogDiscard}
        />
        </React.Fragment>
        )
    }
}

export default ConnectComponent(PVInput)