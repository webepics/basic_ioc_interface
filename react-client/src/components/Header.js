import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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


function Header(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.linkText}>
            <Link to="/">Webepics - Basic IOC Interface</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);