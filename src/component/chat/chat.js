import React from 'react';
import {List, InputItem, WingBlank, WhiteSpace, Button, Toast} from 'antd-mobile';
import {getMsgList} from '../../redux/chat.redux';
import {connect} from 'react-redux';
import io from 'socket.io-client';
const socket =  io('ws://localhost:9093');


@connect(
  state => ({
    chat: state.chat,
    userinfo: state.user
  }),
  {getMsgList}
)
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      msg: []
    }
  }

  componentDidMount() {
    this.props.getMsgList();
    // socket.on('recvmsg', (data) => {
    //   this.setState({msg: [...this.state.msg, data.text]});
    // });
  }

  sendMessage = () => {
    // socket.emit('sendmsg', {text: this.state.text});
    this.setState({
      text: ''
    });
  }

  render() {
    console.log(this.props.match.params.user);
    return (
      <div>
        {
          this.state.msg.map((item) => {
            return <p key={item}>{item}</p>
          })
        }
        <div className="sticky-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={(val) => {this.setState({text: val})}}
              extra={<span onClick={this.sendMessage}>发送</span>}
            ></InputItem>
          </List>
        </div>
      </div>
    );
  }
}

export default Chat;