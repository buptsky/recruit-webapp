import React from 'react';

export default function recruitForm(Component) {
  return class WrapperComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {}
    }

    handleChange = (type, val) => {
      // console.log(type,val);
      this.setState({
        [type]: val
      });
    }

    render() {
      return (
        <Component handleChange={this.handleChange} state={this.state} {...this.props}/>
      )
    }
  }
}