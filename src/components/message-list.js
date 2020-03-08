import React from 'react';
import Controls from './Controls';
import Api from '../api';
import MessageDisplay from './MessageDisplay';
import ErrorSnackbar from './ErrorSnackbar';
import * as Constants from './Constants';
import './styles.css';

class MessageList extends React.PureComponent {
  constructor(...args) {
    super(...args)
    this.state = {
      messages: [],
      snackbarOpen: false,
      snackbarMessage: ''
    };
  }

  api = new Api({
    messageCallback: (message) => {
      this.messageCallback(message);
    },
  })

  componentDidMount() {
    this.api.start();
  }

  messageCallback(message) {
    if (message.priority === 1) {
      this.popUpSnackbar(message.message);
    }

    const { messages } = this.state;
    this.setState({
      messages: [
        ...messages.slice(),
        message,
      ],
    });
  }

  handleClick = () => {
    const isApiStarted = this.api.isStarted();
    if (isApiStarted) {
      this.api.stop();
    } else {
      this.api.start();
    }
    this.forceUpdate();
  }

  clearMessage = (id) => {
    let index = this.state.messages.findIndex(m => m.id === id);
    // create a copy of the array
    let messagesList = this.state.messages.slice();
    // remove item at found index
    messagesList.splice(index, 1);
    this.setState({
      messages: messagesList
    })
  }

  clearAllMessages = () => {
    this.setState({ messages: [] });
  }

  popUpSnackbar = (message) => {
    this.openSnackbar(true, message);
  }

  openSnackbar = (shouldOpen, message='') => {
    if (this.state.snackbarOpen) {
      // if the snackbar is already open, the state needs to change to closed and then open again
      // to trigger the snackbar to re-open
      this.setState({ snackbarOpen: false, snackbarMessage: '' }, () => {
        this.setState({ snackbarOpen: shouldOpen, snackbarMessage: message });
      })
    }
    else {
      this.setState({ snackbarOpen: shouldOpen, snackbarMessage: message });
    }
  }

  render() {
    const isApiStarted = this.api.isStarted();
    return (
      <div style={{minWidth: '450px'}}>
        <div style={{ ...Constants.headerStyle, margin: '40px 40px 15px' }}>
          Help.com Coding Challenge
        </div>
        <hr />
        <Controls
          onClickStartStop={this.handleClick}
          onClickClear={this.clearAllMessages}
          isRunning={isApiStarted}
        />
        <MessageDisplay
          errorMessages={this.state.messages.filter(m => m.priority === 1)}
          warningMessages={this.state.messages.filter(m => m.priority === 2)}
          infoMessages={this.state.messages.filter(m => m.priority === 3)}
          onClickClearMessage={this.clearMessage}
        />
        <ErrorSnackbar
          snackbarIsOpen={this.state.snackbarOpen}
          onClose={() => this.openSnackbar(false)}
        >
          {this.state.snackbarMessage}
        </ErrorSnackbar>
      </div>
    );
  }
}

export default MessageList;
