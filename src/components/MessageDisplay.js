import React from 'react';
import MessageColumn from './MessageColumn';

export default class MessageDisplay extends React.Component {
    render() {
        return (
            <div style={{margin: '20px 60px 0px', display: 'flex', justifyContent: 'space-evenly', backgroundColor: 'gray'}}>
                <div style={{backgroundColor: 'blue', margin: '5px', minHeight: '100px', flex: '1 1 auto'}}><MessageColumn /></div>
                <div style={{backgroundColor: 'blue', margin: '5px', minHeight: '100px', flex: '1 1 auto'}}><MessageColumn /></div>
                <div style={{backgroundColor: 'blue', margin: '5px', minHeight: '100px', flex: '1 1 auto'}}><MessageColumn /></div>
            </div>
        )
    }
}