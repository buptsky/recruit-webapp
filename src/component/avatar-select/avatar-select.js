import React from 'react';
import {Grid, List} from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelect extends React.Component {

  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      ele: {}
    }
  }

  selectAvatar = (ele) => {
    this.setState({ele});
    this.props.selectAvatar(ele.text);
  }

  render() {
    const avatarList = 'boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'.split(',').map(val => {
      return {
        icon: require(`../../asset/avatar-imgs/${val}.png`),
        text: val
      }
    });
    const gridHeader = this.state.ele.text ?
      (
        <div>
          <span>已选择头像</span>
          <img src={this.state.ele.icon} alt={this.state.ele.text} style={{width: 20}}/>
        </div>
      ) : (<div>请选择头像</div>);
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid data={avatarList} onClick={this.selectAvatar}/>
        </List>
      </div>
    );
  }
}

export default AvatarSelect;