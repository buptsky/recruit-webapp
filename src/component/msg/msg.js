import React from 'react';
import {connect} from 'react-redux';
import {List} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

@connect(
  state => ({
    chat: state.chat,
    userinfo: state.user
  }),
  {}
)
class Msg extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {
    const userId = this.props.userinfo.userId;
    // 按照聊天用户分组，根据chatid
    const msgGroup = {};
    this.props.chat.chatmsg.forEach((item) => {
      msgGroup[item.chatid] = msgGroup[item.chatid] || [];
      msgGroup[item.chatid].push(item);
    });
    const chatList = Object.values(msgGroup);
    console.log(chatList);
    return (
      <div>
        {
          chatList.map(item => {
            const lastItem = item[item.length - 1];
            const targetId = lastItem.from === userId ?
              lastItem.to : lastItem.from;
            const targetUser = this.props.chat.users[targetId];
            return (
              <List key={lastItem._id}>
                <Item thumb={require(`../../asset/avatar-imgs/${targetUser.avatar}.png`)}>
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