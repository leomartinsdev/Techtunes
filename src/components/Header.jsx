import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    headerloading: true,
    recoveredName: '',
  };

  async componentDidMount() {
    const userInfo = await this.userNameRecover();
    const { name } = userInfo;
    this.setState({
      headerloading: false,
      recoveredName: name,
    });
  }

  userNameRecover = async () => {
    const recoveredUserInfo = await getUser();
    return recoveredUserInfo;
  };

  render() {
    const { headerloading, recoveredName } = this.state;
    return (
      <header data-testid="header-component">
        { headerloading
          ? <Loading />
          : <p data-testid="header-user-name">{ recoveredName }</p> }
      </header>
    );
  }
}

Header.propTypes = ({
  carregando: PropTypes.bool,
  recUserName: PropTypes.func,
}).isRequired;
