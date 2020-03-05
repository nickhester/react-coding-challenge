import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

export default function MessageColumn(props) {
    return (
        <div style={{ backgroundColor: 'lightgray', margin: '5px', minHeight: '100px', flex: '1 1 auto' }}>
            {props.name}
            {`Count ${props.messages.length}`}
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

MessageColumn.propTypes = {
    messages: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    onClickClearMessage: PropTypes.func.isRequired
};