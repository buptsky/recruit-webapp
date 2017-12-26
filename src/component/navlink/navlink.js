import React from 'react';
import {TabBar} from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

@withRouter
class Navlink extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    const navList = this.props.data.filter((item) => !item.hide);
    const {pathname} = this.props.location;
    return (
      <div>
        <TabBar>
          {navList.map(item => {
            return (
              <TabBar.Item
                title={item.text}
                key={item.text}
                icon={{uri: require(`../../asset/nav-imgs/${item.icon}.png`)}}
                selectedIcon={{uri: require(`../../asset/nav-imgs/${item.icon}-active.png`)}}
                selected={pathname === item.path}
                onPress={() => {
                  this.props.history.push(item.path)
                }}
              >
              </TabBar.Item>
            );
          })}
        </TabBar>
      </div>
    );
  }
}

export default Navlink;