import React from 'react';
import PropTypes from 'prop-types';
import MessageColumn from './MessageColumn';

export default function MessageDisplay(props) {
    const styles = useStyles();
    return (
        <div style={styles.root}>
            <MessageColumn
                messages={props.errorMessages}
                name="Error Type 1"
                onClickClearMessage={props.onClickClearMessage}
            />
            <MessageColumn
                messages={props.warningMessages}
                name="Warning Type 2"
                onClickClearMessage={props.onClickClearMessage}
            />
            <MessageColumn
                messages={props.infoMessages}
                name="Info Type 3"
                onClickClearMessage={props.onClickClearMessage}
            />
        </div>
    );
}

function useStyles() {
    return {
        root: {
            margin: '20px 140px 0px',
            display: 'flex',
            justifyContent: 'space-evenly'
        }
    }
};

MessageDisplay.propTypes = {
    errorMessages: PropTypes.array.isRequired,
    warningMessages: PropTypes.array.isRequired,
    infoMessages: PropTypes.array.isRequired,
    onClickClearMessage: PropTypes.func.isRequired
};