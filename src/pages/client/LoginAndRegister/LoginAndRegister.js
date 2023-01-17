import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LoginAndRegister.scss';
import loginandregisterimg from '~/assets/images/backgound/lar.avif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faGifts, faUser } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { createNewUser } from '~/services/clientService';
import { toast } from 'react-toastify';
import Button from '~/components/Button/Button';
import { getToken } from '~/utils/token';
import * as actions from '~/store/actions';
import { Navigate } from 'react-router-dom';
import { login } from '~/services/clientService';
import { redirect } from 'react-router-dom';
import './LARResponsive.scss';
class LoginAndRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenLarComponent: false,
      loginOption: true,
      emailErrorMessage: false,
      passwordErrorMessage: false,
      email: '',
      password: '',
      clicked: false,
      isLoggin: false,
    };
  }
  componentWillUnmount() {
    this.setState({
      isOpenLarComponent: false,
      loginOption: true,
    });
  }
  componentDidMount() {}
  async componentDidUpdate(prevProps, prevStates) {}
  specialFunc = () => {
    console.log('checlk all state', this.state);
  };
  handleBack = () => {
    this.setState({ isOpenLarComponent: false });
  };
  changeToRegister = () => {
    this.setState({
      isOpenLarComponent: false,
      loginOption: false,
    });
  };
  changeToLogin = () => {
    this.setState({
      isOpenLarComponent: false,
      loginOption: true,
    });
  };
  openLoginForm = () => {
    this.setState({
      isOpenLarComponent: true,
      loginOption: true,
    });
  };
  openRegisterForm = () => {
    this.setState({
      isOpenLarComponent: true,
      loginOption: false,
    });
  };
  handleOnchaneInput = (e, type) => {
    let copyState = { ...this.state };
    copyState[type] = e.target.value;
    this.setState({
      ...copyState,
    });
    this.handleValidate(e, type);
  };
  handleLogin = async () => {
    let data = {};
    let { handleLoginAction, tokens } = this.props;
    data.email = this.state.email;
    data.password = this.state.password;
    let res = await handleLoginAction(data);

    if (res && res.errCode === 0 && res.tokens) {
      this.setState({
        isLoggin: true,
      });
    }
  };
  handleRegister = async () => {
    let data = {};
    data.email = this.state.email;
    data.password = this.state.password;
    let res = await createNewUser(data);

    if (res && res.errCode === 0) {
      toast.success(res.errMessage);
    }
    if (res && res.errCode === 1) {
      toast.error(res.errMessage);
    }
  };
  handleValidate = (e, type) => {
    if (type === 'email') {
      let reg =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let emailValue = e.target.value;
      let validate = emailValue.match(reg);

      if (!validate) {
        this.setState({
          emailErrorMessage: true,
        });
      } else {
        this.setState({
          emailErrorMessage: false,
        });
      }
    }
    if (type === 'password') {
      let min = 5;
      let passwordValue = e.target.value;
      if (passwordValue.length < min) {
        this.setState({
          passwordErrorMessage: true,
        });
      } else {
        this.setState({
          passwordErrorMessage: false,
        });
      }
    }
  };
  render() {
    let { tokens } = this.props;

    let { loginOption, isOpenLarComponent, email, password, emailErrorMessage, passwordErrorMessage, isLoggin } =
      this.state;
    if (isLoggin === true && tokens && tokens.accessToken && tokens.refreshToken) {
      return <Navigate replace to="/" />;
    }
    if (tokens && tokens.accessToken && tokens.refreshToken) {
      return <Navigate replace to="/" />;
    } else {
      return (
        <div className="login-register-container">
          <div className="background">
            <img src={loginandregisterimg} alt="picture" />
          </div>
          <div className="overlay">
            <div className="lar-content">
              <div className="lar-icon">
                <FontAwesomeIcon
                  className={isOpenLarComponent === false ? `icon-back hidden` : `icon-back`}
                  icon={faAngleLeft}
                  onClick={() => this.handleBack()}
                />
                <FontAwesomeIcon
                  icon={faGifts}
                  className={isOpenLarComponent === true ? `icon-main hidden` : `icon-main`}
                />
              </div>
              {loginOption === true ? (
                <div className="lar-header">Login with ToyStore</div>
              ) : (
                <div className="lar-header">Register with ToyStore</div>
              )}

              <div className="main-content">
                {isOpenLarComponent === false && loginOption === true && (
                  <>
                    <div className="login-social" onClick={() => this.openLoginForm()}>
                      <FontAwesomeIcon className="icon icon-email" icon={faUser} /> Login with email
                    </div>
                    <div className="login-social">
                      <FontAwesomeIcon className="icon icon-google" icon={faGoogle} /> Login with Google
                    </div>
                    <div className="login-social">
                      <FontAwesomeIcon className="icon icon-facabook" icon={faFacebook} /> Login with Facebook
                    </div>
                  </>
                )}
                {isOpenLarComponent === false && loginOption === false && (
                  <>
                    <div className="login-social" onClick={() => this.openRegisterForm()}>
                      <FontAwesomeIcon className="icon icon-email" icon={faUser} /> Register with email
                    </div>
                    <div className="login-social">
                      <FontAwesomeIcon className="icon icon-google" icon={faGoogle} /> Start with Google
                    </div>
                    <div className="login-social">
                      <FontAwesomeIcon className="icon icon-facabook" icon={faFacebook} /> Start with Facebook
                    </div>
                  </>
                )}
                {isOpenLarComponent === true && (
                  <div className="login-content">
                    <div className="wrap-email">
                      <input
                        value={email}
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => this.handleOnchaneInput(e, 'email')}
                        // onKeyDown={(e) => this.handleValidate(e, 'email')}
                      />
                      {emailErrorMessage === true ? (
                        <p className="error-message">Please type the correct email format</p>
                      ) : null}
                    </div>
                    <div className="wrap-password">
                      <input
                        value={password}
                        placeholder="Enter your password"
                        onChange={(e) => this.handleOnchaneInput(e, 'password')}
                        // onKeyDown={(e) => this.handleValidate(e, 'password')}
                      />
                      {passwordErrorMessage === true ? <p className="error-message">Password min 5 character</p> : null}
                    </div>
                    {loginOption === true ? (
                      <p onClick={() => this.handleLogin()}>
                        <Button
                          name="Login"
                          status={
                            emailErrorMessage === true || passwordErrorMessage === true || !password || !email
                              ? 'disabled'
                              : null
                          }
                        />
                      </p>
                    ) : (
                      <p onClick={() => this.handleRegister()}>
                        <Button
                          name="Register"
                          status={
                            emailErrorMessage === true || passwordErrorMessage === true || !password || !email
                              ? 'disabled'
                              : null
                          }
                        />
                      </p>
                    )}
                  </div>
                )}
              </div>
              {loginOption === true ? (
                <p className="lar-option">
                  You don't have accouunt?{' '}
                  <p onClick={() => this.changeToRegister()} className="">
                    Register
                  </p>
                </p>
              ) : (
                <p className="lar-option">
                  Have accouunt?{' '}
                  <p className="" onClick={() => this.changeToLogin()}>
                    Login
                  </p>
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return { tokens: state.auth.tokens };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleLoginAction: (data) => dispatch(actions.handleLogin(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginAndRegister);
