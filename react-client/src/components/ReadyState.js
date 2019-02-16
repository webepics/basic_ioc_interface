import React from 'react'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    success: {
        color: theme.palette.success.main,
    },
    warning: {
        color: theme.palette.warning.main,
    },
    error: {
        color: theme.palette.error.main,
    },
});

function ReadyState(props) {
    const { readyState, classes } = props;
    if (readyState === 0) return <span className={classes.warning}>Connecting</span>
    if (readyState === 1) return <span className={classes.success}>Connected</span>
    if (readyState === 2) return <span className={classes.warning}>Disconnecting</span>
    if (readyState === 3) return <span className={classes.error}>Disconnected</span>
    return <span className={classes.error}>Error</span>
}

export default withStyles(styles)(ReadyState)