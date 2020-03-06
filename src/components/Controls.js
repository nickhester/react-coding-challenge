import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import * as Constants from './Contants';

export default function Controls(props) {
    const styles = useStyles();
    return(
        <div style={styles.root}>
            <Button
                onClick={props.onClickStartStop}
                variant="contained"
                style={styles.button}
            >
                {props.isRunning ? 'STOP' : 'START'}
            </Button>
            <Button
                onClick={props.onClickClear}
                variant="contained"
                style={styles.button}
            >
                CLEAR
            </Button>
        </div>
    );
}

function useStyles() {
    return {
        root: {
            display: 'flex',
            justifyContent: 'center'
        },
        button: {
            backgroundColor: Constants.green,
            margin: '5px',
            width: '100px'
        }
    }
};

Controls.propTypes = {
    onClickStartStop: PropTypes.func.isRequired,
    onClickClear: PropTypes.func.isRequired,
    isRunning: PropTypes.bool.isRequired
}