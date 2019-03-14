import React from 'react'
import { connect } from "react-redux";
import classNames from 'classnames';
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
    minimal: {
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '4px 8px',
    }
});

function ReadyState(props) {
    const { classes, isMinimal } = props;
    const readyState = props.websocket.readyState;
    let details = {title: "Error", iconClass:"fas fa-plug", className:"error"}

    if (readyState === 0)
      details = {title: "Connecting", iconClass:"fas fa-plug", className:"warning"}
    if (readyState === 1)
      details = {title: "Connected", iconClass:"fas fa-plug", className:"success"}
    if (readyState === 2)
      details = {title: "Disconnecting", iconClass:"fas fa-plug", className:"warning"}
    if (readyState === 3)
      details = {title: "Disconnected", iconClass:"fas fa-plug", className:"error"}

    if (isMinimal) {
        return (
            <span className={classNames(classes.minimal, classes[details.className])}>
            <i title={details.title} className={details.iconClass}/>
            </span>
        )

    } else {
        return (
            <span className={classes[details.className]}>{details.title}&nbsp;
            <i className={details.iconClass}/>
            </span>
        )
    }
}

function mapStateToProps(state){
  return {
    websocket: state.websocket,
  }
}

export default withStyles(styles)(connect(mapStateToProps)(ReadyState))