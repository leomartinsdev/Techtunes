import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { createUser } from './services/userAPI';
import Login from './pages/Login';
import Album from './pages/Album';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  state = {
    userName: '',
    loginBtnDisabled: true,
    carregando: false,
    logado: false,
  };

  // função que, ao clicar no botão entrar, apareça uma mensagem de "carregando" e, ao terminar de rodar a API, redirecionar para o /search
  handleEnterButton = async (event, userName) => {
    event.preventDefault();
    this.setState({
      carregando: true,
    });
    const captura = await createUser({ name: userName });
    console.log(captura);
    this.setState({
      carregando: false,
      logado: true,
    });
  };

  // function that validates the login. If the name input doesn't have a length of >= 3, the Enter button will be disabled
  loginValidation = () => {
    const { userName } = this.state;
    const minNameReq = 3;
    const nameVal = userName.length >= minNameReq;

    this.setState({
      loginBtnDisabled: !nameVal,
    });
  };

  // this handles every validation inside the onInputChange function
  validations = () => {
    this.loginValidation();
  };

  // generic event handler.
  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState(
      {
        [name]: value,
      },
      this.validations
    );
  };

  render() {
    const { userName, loginBtnDisabled, logado, carregando } = this.state;
    return (
      <main>
        <Switch>
          <Route exact path="/">
            {logado ? (
              <Redirect to="/search" />
            ) : (
              <Route
                exact
                path="/"
                render={(props) => (
                  <Login
                    {...props}
                    userName={userName}
                    loginBtnDisabled={loginBtnDisabled}
                    onInputChange={this.onInputChange}
                    handleEnterButton={this.handleEnterButton}
                    carregando={carregando}
                    logado={logado}
                  />
                )}
              />
            )}
          </Route>

          <Route exact path="/search" render={(props) => <Search {...props} />} />

          <Route exact path="/album/:id" component={Album} />
          <Route exact path="/favorites" component={Favorites} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/profile/edit" component={ProfileEdit} />
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
    );
  }
}

export default App;
