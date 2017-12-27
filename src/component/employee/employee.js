import React from 'react';
import UserInfo from '../userinfo/userinfo';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/chatuser.redux';

@connect(
  state => ({
    userlist: state.chatuser.userlist
  }),
  {getUserList}
)
class Employee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getUserList('boss');
  }

  render() {
    // console.log(this.props.userlist);
    return (
      <div>
        <UserInfo userlist={this.props.userlist}/>
      </div>
    );
  }
}

export default Employee;