import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showError: false,
    errorMsg: '',
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const UserDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(UserDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  render() {
    const {showPassword, showError, username, password, errorMsg} = this.state
    const typeText = showPassword ? 'text' : 'password'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-con">
        <div className="login-con">
          <div className="div-img">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="watch logo"
              className="log-img"
            />
          </div>
          <form onSubmit={this.onSubmit} className="form">
            <div className="input-container">
              <label htmlFor="user" className="label">
                USERNAME
              </label>
              <input
                id="user"
                type="text"
                placeholder="Username"
                value={username}
                onChange={this.onChangeUserName}
                className="input"
              />
            </div>
            <div className="input-container">
              <label htmlFor="pass" className="label">
                PASSWORD
              </label>
              <input
                id="pass"
                type={typeText}
                placeholder="Password"
                value={password}
                onChange={this.onChangePassword}
                className="input"
              />
            </div>
            <div className="check-box">
              <input
                type="checkbox"
                id="checkbox"
                onChange={this.onShowPassword}
              />
              <label htmlFor="checkbox" className="label">
                Show Password
              </label>
            </div>
            <button type="submit" className="button-login">
              Login
            </button>
            {showError && <p className="error">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
