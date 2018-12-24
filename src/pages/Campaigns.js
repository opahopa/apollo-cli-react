import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppCampaignCard from '../components/Campaign';
import { Query} from 'react-apollo';
import gql from 'graphql-tag';

const CAMPAIGN_BY_ID = gql`
    query FindCampaignById($id: ID!) {
        campaign(id: $id) {
            id
            name
            description
            target
            collected
            contributors {
                email
            }
            isActive
            user {
                id
                email
            }
        }
    }
`;

const CAMPAIGNS_ALL = gql`
    query FindAllCampaigns {
        campaigns {
            id
            name
            description
            target
            collected
            user {
                id
                email
            }
            isActive
        }
    }
`;

const styles = theme => ({
    root: {

    }
});

class AppCampaigns extends React.Component {
    state = {
        open: true,
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Query query={CAMPAIGN_BY_ID} variables={{ id: 10 }}>
                    {({ data, loading, error }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>ERROR</p>;

                        return (
                            <Fragment>
                                {data.campaign ? <AppCampaignCard campaign={data.campaign}/> : '' }
                            </Fragment>
                        );
                    }}
                </Query>
                <Query query={CAMPAIGNS_ALL}>
                    {({ data, loading, error }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>ERROR</p>;

                        return (
                            data.campaigns ?
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="right">Description</TableCell>
                                            <TableCell align="right">Target</TableCell>
                                            <TableCell align="right">UserId</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.campaigns.slice(0, 10).map(row => {
                                            return (
                                                <TableRow key={row.id} data-testid="campaigns-row">
                                                    <TableCell component="th" scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="right">{row.description.substring(0,30)}...</TableCell>
                                                    <TableCell align="right">{row.target}$</TableCell>
                                                    <TableCell align="right">{row.user.id}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                                :''
                        );
                    }}
                </Query>
            </div>
        );
    }
}


AppCampaigns.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppCampaigns);
