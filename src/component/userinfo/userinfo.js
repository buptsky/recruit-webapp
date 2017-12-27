import React from 'react';
import {Card, WhiteSpace} from 'antd-mobile';
import PropTypes from 'prop-types';

class UserInfo extends React.Component {

  static propTypes = {
    userlist: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <WhiteSpace/>
        {this.props.userlist.map((item) => {
          return item.avatar ? (
            <Card key={item._id}>
              <Card.Header
                title={item.userName}
                thumb={require(`../../asset/avatar-imgs/${item.avatar}.png`)}
                extra={<span>{item.title}</span>}
              />
              <Card.Body>
                <div>
                  {item.desc.split('\n').map((item, index) => {
                    return (<div key={index}>{item}</div>);
                  })}
                </div>
              </Card.Body>
              {
                item.company && (
                  <Card.Footer content={item.company} extra={item.salary} />)
              }
            </Card>
          ) : null
        })}
      </div>
    );
  }
}

export default UserInfo;