import React from 'react';
import PropTypes from 'prop-types';

export default function Message(props) {
    let styleColor;
    if (props.type === 1) styleColor = '#F56236';
    else if (props.type === 2) styleColor = '#FCE788';
    else styleColor = '#88FCA3';

    return (
        <div style={{backgroundColor: styleColor, margin: '5px'}}>
            {props.text}
            <button onClick={props.onClickClear}>
                CLEAR
            </button>
        </div>
    );
}

Message.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf([1, 2, 3]).isRequired,
    onClickClear: PropTypes.func.isRequired
};