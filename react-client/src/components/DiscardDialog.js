
import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class DiscardDialog extends Component {
    render() {
        const {open, handleDiscard, handleClose} = this.props;
        return (
         <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Discard your value?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to discard your value?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDiscard} color="primary">
              Discard Value
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Keep Value
            </Button>
          </DialogActions>
        </Dialog>
        )
    }
}

export default DiscardDialog