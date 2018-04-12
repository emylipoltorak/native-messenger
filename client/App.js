import React, { Component } from 'react';
import Login from './login';
import ChatClient from './chatclient';

export default class App extends Component {
  constructor (props) {
    super(props);
    this.handleSubmitName = this.onSubmitName.bind(this);
    this.state = { hasName: false };
  }

  onSubmitName(e) {
    const name = e.nativeEvent.text;
    this.setState({
      name,
      hasName: true
    });
  }

  render() {
    console.log(this.state);
    if (this.state.hasName) {
      return (
        <ChatClient name={ this.state.name } />
      );
    } else {
      return (
        <Login onSubmitName={ this.handleSubmitName } />
      )
    }
  }
}
