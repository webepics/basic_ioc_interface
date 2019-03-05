import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import WebSocketManager from '../WebSocketManager'
import { DRAWER_TOGGLE } from '../redux/actions'

const drawerWidth = 500;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
});

class SettingsDrawer extends React.Component {

  handleDrawerClose = () => {
    this.props.dispatch({type: DRAWER_TOGGLE})
  };

  render() {
    const { classes, theme } = this.props;
    const open  = this.props.display.drawer.open;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <i className="fas fa-chevron-left"/> : <i className="fas fa-chevron-right"/>}
            </IconButton>
          </div>
          <Divider />
          <WebSocketManager/>
        </Drawer>
      </div>
    );
  }
}

SettingsDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  return {
    display: state.display,
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(SettingsDrawer));