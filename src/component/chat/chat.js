import React from 'react';
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile';
import {getMsgList, sendMsg, recvMsg, readMsg} from '../../redux/chat.redux';
import {getChatId} from '../../util';
import {connect} from 'react-redux';
import QueueAnim from 'rc-queue-anim';

const Item = List.Item;

@connect(
  state => ({
    chat: state.chat,
    userinfo: state.user,
    chatuser: state.chatuser
  }),
  {getMsgList, sendMsg, recvMsg, readMsg}
)
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      showEmoji: false
    }
  }

  componentDidMount() {
    if (!Object.keys(this.props.chat.users).length) {
      this.props.getMsgList();
      this.props.recvMsg();
    }
  }

  componentWillUnmount() {
    const to = this.props.match.params.user;
    this.props.readMsg(to);
  }

  fixCarousel = () => {
    // 解决ant-mobile grid 轮播效果bug
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  sendMessage = () => {
    const from = this.props.userinfo._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({from, to, msg});
    this.setState({text: ''});
  }

  render() {
    const emoji = '😁 😂 😃 😄 😅 😆 😉 😊 😋 😌 😍 😏 😒 😓 😔 😖 😘 😚 😜 😝 😞 😠 😡 😢 😣 😤 😥 😨 😩 😪 😫 😭 😰 😱 😲 😳 😵 😷 🙋 🙌 🙍 🙎 🚀 🚃 🚄 ⚽ ⚾ 🌂 🌟 🍜 🍟 🍨 🍴 🍺 🎄 🎹 🎼'.split(/\s+/).map(item => ({text: item}));
    const userId = this.props.match.params.user;
    const users = this.props.chat.users;
    if (!users[userId]) return null;
    const chatId = getChatId(userId, this.props.userinfo._id);
    const chatmsgs = this.props.chat.chatmsg.filter(item => item.chatid === chatId);
    return (
      <div id="chat-page" style={{marginTop: 45}}>
        <NavBar
          mode='dark'
          icon={<Icon type="left"/>}
          onLeftClick={() => this.props.history.goBack()}
          className="fixd-header"
        >
          {users[userId].name}
        </NavBar>
        <QueueAnim>
          {
            chatmsgs.map((item, index) => {
              const avatar = require(`../../asset/avatar-imgs/${users[item.from].avatar}.png`)
              if (item.from === userId) {
                return (
                  <List key={item._id}>
                    <Item thumb={avatar}>{item.content}</Item>
                  </List>
                )
              } else {
                return (
                  <List key={item._id}>
                    <Item className="chat-me" extra={<img src={avatar} alt=""/>}>
                      {item.content}
                    </Item>
                  </List>
                )
              }
            })
          }
        </QueueAnim>
        <div className="sticky-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={(val) => {
                this.setState({text: val})
              }}
              extra={
                <div>
                  <span style={{marginRight: 15}}
                        role="img"
                        aria-label="smail"
                        onClick={() => {
                    this.setState({showEmoji: !this.state.showEmoji});
                    this.fixCarousel();
                  }}>😃</span>
                  <span onClick={this.sendMessage}>发送</span>
                </div>
              }
            ></InputItem>
          </List>
          {
            this.state.showEmoji && (
              <Grid
                data={emoji}
                isCarousel
                columnNum={8}
                carouselMaxRow={4}
                onClick={el => this.setState({text: this.state.text + el.text})}
              />
            )
          }
        </div>
      </div>
    );
  }
}

export default Chat;