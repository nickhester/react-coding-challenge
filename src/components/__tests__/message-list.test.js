import React from 'react'
import MessageList from '../message-list'
import Message from '../Message';
import MessageColumn from '../MessageColumn';
import MessageDisplay from '../MessageDisplay';
import Controls from '../Controls';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';
import ErrorSnackbar from '../ErrorSnackbar';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('message-list', () => {
  test('should render sub-components', () => {
    // setup
    const shallowComponent = shallow(<MessageList />);

    // test
    expect(shallowComponent.find(Controls).exists()).toBe(true);
    expect(shallowComponent.find(MessageDisplay).exists()).toBe(true);
    expect(shallowComponent.find(ErrorSnackbar).exists()).toBe(true);
  });

  test('messageCallBack should call popUpSnackbar()', () => {
    // setup
    const shallowComponent = shallow(<MessageList />);
    let instance = shallowComponent.instance();
    
    const popUpSnackbarSpy = jest.fn();
    const setStateSpy = jest.fn();

    instance.popUpSnackbar = popUpSnackbarSpy;
    instance.setState = setStateSpy;

    // test
    instance.messageCallback({ message: 'test message', priority: 2 });
    expect(popUpSnackbarSpy).not.toHaveBeenCalled();
    instance.messageCallback({ message: 'test message', priority: 1 });
    expect(popUpSnackbarSpy).toHaveBeenCalled();
  });

  test('messageCallBack should call setState()', () => {
    // setup
    const shallowComponent = shallow(<MessageList />);
    let instance = shallowComponent.instance();
    
    const setStateSpy = jest.fn();

    instance.setState = setStateSpy;
    instance.state = { messages: ['m1', 'm2'] };

    // test
    instance.messageCallback({ message: 'test message', priority: 2 });
    expect(setStateSpy.mock.calls[0][0]).toEqual({ messages: ['m1', 'm2', {message:'test message', priority:2}]});
  });

  test('handleClick should call stop and forceUpdate when api has started', () => {
    // setup
    const shallowComponent = shallow(<MessageList />);
    let instance = shallowComponent.instance();

    const isStartedSpy = jest.fn(() => true);
    const stopSpy = jest.fn();
    const startSpy = jest.fn();
    const forceUpdateSpy = jest.fn();

    instance.api = { isStarted: isStartedSpy, stop: stopSpy, start: startSpy };
    instance.forceUpdate = forceUpdateSpy;

    // test
    instance.handleClick();
    expect(stopSpy).toHaveBeenCalled();
    expect(forceUpdateSpy).toHaveBeenCalled();
  });

  test('handleClick should call start and forceUpdate when api is not started', () => {
    // setup
    const shallowComponent = shallow(<MessageList />);
    let instance = shallowComponent.instance();

    const isStartedSpy = jest.fn(() => false);
    const stopSpy = jest.fn();
    const startSpy = jest.fn();
    const forceUpdateSpy = jest.fn();

    instance.api = { isStarted: isStartedSpy, stop: stopSpy, start: startSpy };
    instance.forceUpdate = forceUpdateSpy;

    // test
    instance.handleClick();
    expect(startSpy).toHaveBeenCalled();
    expect(forceUpdateSpy).toHaveBeenCalled();
  });

  test('clearMessage should remove a matching element and calls setState', () => {
    // setup
    const shallowComponent = shallow(<MessageList />);
    let instance = shallowComponent.instance();

    const setStateSpy = jest.fn();
    const list = [{id: 1}, {id: 2}, {id: 3}];
    const outputList = [{id: 1}, {id: 3}];
    instance.state.messages = list;
    instance.setState = setStateSpy;

    // test
    instance.clearMessage(2);
    expect(setStateSpy.mock.calls[0][0]).toEqual({messages: outputList});
  });

  test('clearAllMessages should call setState with empty list', () => {
    // setup
    const shallowComponent = shallow(<MessageList />);
    let instance = shallowComponent.instance();

    const setStateSpy = jest.fn();
    instance.setState = setStateSpy;

    // test
    instance.clearAllMessages();
    expect(setStateSpy.mock.calls[0][0]).toEqual({messages: []});
  });

  test('popUpSnackbar should call openSnackbar with true and message', () => {
    // setup
    const shallowComponent = shallow(<MessageList />);
    let instance = shallowComponent.instance();

    const openSnackbarSpy = jest.fn();
    instance.openSnackbar = openSnackbarSpy;

    // test
    instance.popUpSnackbar('test message');
    expect(openSnackbarSpy.mock.calls[0]).toEqual([true, 'test message']);
  });

  test('openSnackbar should call setState when snackbar is open', () => {
    // setup
    const shallowComponent = shallow(<MessageList />);
    let instance = shallowComponent.instance();

    const setStateSpy = jest.fn();
    instance.setState = setStateSpy;
    instance.state = {snackbarOpen: true};

    // test
    instance.openSnackbar(true, 'test message');
    expect(setStateSpy.mock.calls[0][0]).toEqual({snackbarOpen: false, snackbarMessage: ''});
    const callbackFunction = setStateSpy.mock.calls[0][1];
    callbackFunction();
    expect(setStateSpy).toHaveBeenCalledTimes(2);
  });

  test('openSnackbar should call setState when snackbar is not open', () => {
    // setup
    const shallowComponent = shallow(<MessageList />);
    let instance = shallowComponent.instance();

    const setStateSpy = jest.fn();
    instance.setState = setStateSpy;
    instance.state = {snackbarOpen: false};

    // test
    instance.openSnackbar(true, 'test message');
    expect(setStateSpy.mock.calls[0][0]).toEqual({snackbarOpen: true, snackbarMessage: 'test message'});
  });
});

describe('Controls', () => {
  test('should render sub-components', () => {
    // setup
    const shallowComponent = shallow(<Controls onClickStartStop={jest.fn()} onClickClear={jest.fn()} isRunning />);

    // test
    expect(shallowComponent.find(Button)).toHaveLength(2);
  });
});

describe('ErrorSnackbar', () => {
  test('should render sub-components', () => {
    // setup
    const shallowComponent = shallow(<ErrorSnackbar snackbarIsOpen onClose={jest.fn()} />);

    // test
    expect(shallowComponent.find(Snackbar)).toHaveLength(1);
  });
});

describe('Message', () => {
  test('should render sub-components', () => {
    // setup
    const shallowComponent = shallow(<Message text="test text" type={1} onClickClear={jest.fn()} />);

    // test
    expect(shallowComponent.find(Card)).toHaveLength(1);
    expect(shallowComponent.find(Button)).toHaveLength(1);
  });
});

describe('MessageColumn', () => {
  test('should render sub-components', () => {
    // setup
    const shallowComponent = shallow(<MessageColumn messages={[
      {id: '1', message: '1', priority: 1},
      {id: '2', message: '2', priority: 2},
      {id: '3', message: '3', priority: 3}
    ]} name="test name" onClickClearMessage={jest.fn()} />);

    // test
    expect(shallowComponent.find(Message)).toHaveLength(3);
  });
});

describe('MessageDisplay', () => {
  test('should render sub-components', () => {
    // setup
    const shallowComponent = shallow(<MessageDisplay errorMessages={[]} warningMessages={[]} infoMessages={[]} onClickClearMessage={jest.fn()} />);

    // test
    expect(shallowComponent.find(MessageColumn)).toHaveLength(3);
  });
});
