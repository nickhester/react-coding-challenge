import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import * as Constants from './Contants';

export default function MessageColumn(props) {
    const styles = useStyles();

    return (
        <div style={styles.root}>
            <div style={styles.title}>{props.name}</div>
            <div style={styles.count}>{`Count ${props.messages.length}`}</div>
            {props.messages.map(m => {
                return (
                    <Message
                        key={m.id}
                        text={m.message}
                        type={m.priority}
                        onClickClear={() => props.onClickClearMessage(m.id)}
                    />
                );
            })}
        </div>
    );
}

function useStyles() {
    return {
        root: {
            flex: '1 1 1',
            width: '100%',
            padding: '5px'
        },
        title: Constants.headerStyle,
        count: {
            ...Constants.paragraphStyle,
            lineHeight: '2em'
        }
    }
};

MessageColumn.propTypes = {
    messages: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    onClickClearMessage: PropTypes.func.isRequired
};