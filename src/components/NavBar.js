import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";


import { Query} from 'react-apollo';
import gql from 'graphql-tag';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        color: '#fff'
    },

};

const GET_USERNAME_INPUT = gql`
    {
        username @client
    }
`;

class AppNavBar extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Query query={GET_USERNAME_INPUT}>
                            {({ data, client }) => (
                                <Typography variant="h6" color="inherit" className={classes.grow} data-testid="username-value">
                                    <div id="username-value-id">Username: {data? data.username : '*enter username*'}</div>
                                </Typography>
                            )}
                        </Query>
                        <Button component={Link} to="/" className={classes.menuButton}>
                            Input
                        </Button>
                        <Button component={Link} to="/campaigns" className={classes.menuButton}>
                            Campaigns
                        </Button>
                        <IconButton color="inherit">
                            <AccountCircle />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

AppNavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppNavBar);