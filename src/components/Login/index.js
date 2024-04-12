import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showPassword: false, showError: false}

  onChangeUser = event => {
    this.setState({username: event.target.value})
  }

  onChangePass = event => {
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

  onSubmit = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const UserDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(UserDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (data.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="user" className="label">
          USERNAME
        </label>
        <input
          id="user"
          type="text"
          placeholder="Username"
          value={username}
          onChange={this.onChangeUser}
          className="input"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="pass" className="label">
          PASSWORD
        </label>
        <input
          id="pass"
          type="password"
          placeholder="Password"
          value={password}
          onChange={this.onChangePass}
          className="input"
        />
      </>
    )
  }

  render() {
    const {showPassword, showError} = this.state
    return (
      <div className="main-con">
        <div className="login-con">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="watch logo"
            className="log-img"
          />
          <form onSubmit={this.onSubmit} className="form">
            <div className="input-container">{this.renderUsername()}</div>
            <div className="input-container">{this.renderPassword()}</div>
            <button type="submit" className="button-login">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
