import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';

export default class Login extends Component {
  render() {
    const { userName, onInputChange, loginBtnDisabled, carregando, handleEnterButton } =
      this.props;

    return (
      <div data-testid="page-login">
        Login
        {carregando ? (
          <Loading />
        ) : (
          <form>
            <label htmlFor="userName">
              Nome:
              <input
                type="text"
                name="userName"
                id="userName"
                data-testid="login-name-input"
                value={userName}
                onChange={onInputChange}
              />
            </label>

            <button
              data-testid="login-submit-button"
              disabled={loginBtnDisabled}
              onClick={(event) => handleEnterButton(event, userName)}
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  userName: PropTypes.string,
  onInputChange: PropTypes.func,
  loginBtnDisabled: PropTypes.bool,
}.isRequired;
