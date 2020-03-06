import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import * as Constants from './Contants';

export default function Message(props) {
    const styles = useStyles(props.type - 1);

    return (
        <Card style={styles.card} raised>
            <div style={styles.text}>
                {props.text}
            </div>
            <Button style={styles.button} onClick={props.onClickClear}>
                Clear
            </Button>
        </Card>
    );
}

const colors = [Constants.red, Constants.yellow, Constants.green];

function useStyles(colorIndex) {
    return {
        card: {
            backgroundColor: colors[colorIndex],
            margin: '5px 0',
            minHeight: '50px',
            padding: '10px',
            display: 'flex',
            width: '100%',
        },
        text: {
            ...Constants.paragraphStyle,
            flex: '1 1 auto',
            fontWeight: '500'
        },
        button: {
            flex: '0 0 auto',
            textTransform: 'none'
        }
    }
};

Message.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf([1, 2, 3]).isRequired,
    onClickClear: PropTypes.func.isRequired
};