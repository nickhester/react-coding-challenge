import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Api from '../api';
import MessageDisplay from './MessageDisplay';

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
      <div>
        <h2>Help.com Coding Challenge</h2>
        <hr />
        <div>
          <Button
            onClick={this.handleClick}
          >
            {isApiStarted ? 'STOP' : 'START'}
          </Button>
          <Button
            onClick={this.clearAllMessages}
          >
            CLEAR
          </Button>
        </div>
        <MessageDisplay
          errorMessages={this.state.messages.filter(m => m.priority === 1)}
          warningMessages={this.state.messages.filter(m => m.priority === 2)}
          infoMessages={this.state.messages.filter(m => m.priority === 3)}
          onClickClearMessage={this.clearMessage}
        />
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={2000}
          onClose={() => this.openSnackbar(false)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          action={
            <IconButton size="small" onClick={() => this.openSnackbar(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </div>
    );
  }
}

export default MessageList;
