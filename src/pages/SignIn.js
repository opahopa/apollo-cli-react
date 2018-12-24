import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import { ApolloConsumer } from 'react-apollo';
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

//TODO: Make a proper form validation. Current impl is a kind of 'mockup'.
class SignInPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null,
            formValid: false,
            inputUsername: ''
        };
    }

    validateUsername(evt) {
        if (evt.target.value.length > 50) {
            this.state.errorMessage = 'Error: maxLength';
            return false;
        }
        if (evt.target.value.length < 3) {
            this.state.errorMessage = 'Error: minLength';
            return false;
        }
        return true;
    }

    updateInputUsername(evt) {
        if (this.validateUsername(evt)) {
            this.state.errorMessage = null;
            this.state.formValid = true;
        } else {
            this.state.formValid = false;
        }

        this.setState({
            inputUsername: evt.target.value
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <ApolloConsumer>
                        {client => (
                            <form className={classes.form}>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="email">Username</InputLabel>
                                    <Input id="username" name="username"
                                           autoComplete="email"
                                           data-testid="username-input"
                                           value={this.state.inputUsername}
                                           onChange={evt => this.updateInputUsername(evt)}
                                           autoFocus/>
                                </FormControl>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    id="btn-submit"
                                    data-testid="btn-submit"
                                    disabled={!this.state.formValid}
                                    className={classes.submit}
                                    onClick={(e) => {
                                            if(this.state.formValid) {
                                                client.writeData({ data: { username: this.state.inputUsername }})
                                            }
                                        }
                                    }
                                >
                                    Submit
                                </Button>
                                {this.state.errorMessage? this.state.errorMessage: ''}
                            </form>
                        )}
                    </ApolloConsumer>
                </Paper>
            </main>
        );
    }
}

SignInPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignInPage);
