import React, { PureComponent } from 'react';

interface MyComponentProps {
  text: string | number;
}

class MyPureComponent extends PureComponent<MyComponentProps> {
  render() {
    console.log('pure', this.props.text);
    return <div>{this.props.text}</div>;
  }
}

export default MyPureComponent;
