import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class AppCampaignCard extends React.Component {


    render() {

        const {classes} = this.props;

        return (
            <Card className={classes.card} data-testid="campaign-one">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {this.props.campaign.name}
                    </Typography>
                    <Typography>
                        {this.props.campaign.description}
                    </Typography>
                    <Typography component="p">
                        <strong>Target:</strong>
                        <br/>
                        {this.props.campaign.target} $
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

AppCampaignCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppCampaignCard);


