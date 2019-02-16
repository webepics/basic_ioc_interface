import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import { DRAWER_TOGGLE } from '../redux/actions'
import ReadyState from './ReadyState.js'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
    linkText: {
        flexGrow: 1,
        color: theme.palette.getContrastText(theme.palette.primary.main),
        "& a": {
            color: theme.palette.getContrastText(theme.palette.primary.main),
            textDecoration: 'none',
            "&:visited": {
                color: theme.palette.getContrastText(theme.palette.primary.main),
            },
            "&:hover, &:focus": {
                color: theme.palette.getContrastText(theme.palette.primary.main),
            }
        }
    },
});

class Header extends React.Component {

    handleDrawerToggle = () => {
      this.props.dispatch({type: DRAWER_TOGGLE})
    };
  
    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar> 
              <Typography variant="h6" color="inherit" className={classes.linkText}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classNames(classes.menuButton)}
              >
                <ReadyState isMinimal={true}/>
              </IconButton>
                <Link to="/">Webepics - Basic IOC Interface</Link>
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      );
    }
} 

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  return {
    websocket: state.websocket,
  }
}

export default withStyles(styles)(connect(mapStateToProps)(Header))
