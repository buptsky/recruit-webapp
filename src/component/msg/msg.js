import React from 'react';
import {connect} from 'react-redux';
import {List, Badge} from 'antd-mobile';
import {getMsgList} from '../../redux/chat.redux';

const Item = List.Item;
const Brief = Item.Brief;

@connect(
  state => ({
    chat: state.chat,
    userinfo: state.user
  }),
  {getMsgList}
)
class Msg extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {
    const userId = this.props.userinfo._id;
    // 按照聊天用户分组，根据chatid
    const msgGroup = {};
    this.props.chat.chatmsg.forEach((item) => {
      msgGroup[item.chatid] = msgGroup[item.chatid] || [];
      msgGroup[item.chatid].push(item);
    });
    const chatList = Object.values(msgGroup).sort((chat1, chat2) => {
      return chat2[chat2.length - 1].create_time -  chat1[chat1.length - 1].create_time;
    });
    console.log(chatList);
    return (
      <div>
        {
          chatList.map(item => {
            const lastItem = item[item.length - 1];
            const targetId = lastItem.from === userId ?
              lastItem.to : lastItem.from;
            const unreadNum = item.filter(v => !v.read && v.to === userId).length;
            const targetUser = this.props.chat.users[targetId];
            if (!targetUser) return;
            return (
              <List key={lastItem._id}>
                <Item
                  extra={<Badge text={unreadNum}/>}
                  thumb={require(`../../asset/avatar-imgs/${targetUser.avatar}.png`)}
                  arrow="horizontal"
                  onClick={() => {this.props.history.push(`/chat/${targetId}`)}}
                >
                  {lastItem.content}
                  <Brief>{targetUser.name}</Brief>
                </Item>
              </List>
            )
          })
        }
      </div>
    );
  }
}

export default Msg;