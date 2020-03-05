import React from 'react';
import PropTypes from 'prop-types';
import MessageColumn from './MessageColumn';

export default function MessageDisplay(props) {
    return (
        <div style={{margin: '20px 60px 0px', display: 'flex', justifyContent: 'space-evenly', backgroundColor: 'gray'}}>
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

MessageDisplay.propTypes = {
    errorMessages: PropTypes.array.isRequired,
    warningMessages: PropTypes.array.isRequired,
    infoMessages: PropTypes.array.isRequired,
    onClickClearMessage: PropTypes.func.isRequired
};