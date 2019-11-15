import React, { Component } from "react";
import { Link } from 'react-router-dom';
import API from "../utils/API";
import "../styles/login.css";

class Login extends Component {

  state = {
    userNameLogin: "",
    passwordLogin: "",
    userNameSignup: "",
    passwordSignup: "",
    rePassword: ""
  }

  //handle login forms
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  //handle login. use find to find username
  handleFormSubmitLogin = event => {
    event.preventDefault();
    if (this.state.userNameLogin && this.state.passwordLogin) {
      API.getUser({
        userName: this.state.userNameLogin,
        password: this.state.passwordLogin
      })
        .then(res => { this.props.history.push(`/home/${res.data[0]._id}`) })
        .catch(err => {
          if (err.response.status === 404) {
            alert("Incorrect username and password")
          }
        })
    }
  };

  handleFormSubmitSignup = event => {
    event.preventDefault();
    if (this.state.passwordSignup !== this.state.rePassword) {
      alert("Password do not match")
      return
    }
    API.saveUser({
      userName: this.state.userNameSignup,
      password: this.state.passwordSignup,
      exp: 0
    })
      .then(res => {
        this.props.history.push(`/welcome/${res.data._id}`)

      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 422) {
          alert("Username already exist")
        }
      })

  }

  render() {
    return (
      <>
        <div className="jumbotron" id="login-page">
          <h1>Welcome to Reign of React!</h1>
          <h3>Sign in or register a new account with us to play</h3>
          <form id="sign-in">
            <h3>Sign In</h3>
            <div className="form-group">
              <label
                htmlFor="loginEmail"
              >Email address</label>
              <input
                type="text"
                className="form-control"
                id="loginEmail"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="userNameLogin"
                value={this.state.userNameLogin}
                onChange={this.handleInputChange}
              />
              <small
                id="emailHelp"
                className="form-text text-muted"
              >Please Enter Your Email</small>
            </div>
            <div className="form-group">
              <label htmlFor="loginPassword">Password</label>
              <input
                type="password"
                className="form-control"
                id="loginPassword"
                placeholder="Password"
                name="passwordLogin"
                value={this.state.passwordLogin}
                onChange={this.handleInputChange} />
              <small id="emailHelp" className="form-text text-muted">Please Enter Your Password</small>
            </div>
            {/* <Link to="/home"> */}
            <button
              type="submit"
              className="btn btn-lg btn-dark"
              disabled={!(this.state.userNameLogin && this.state.passwordLogin)}
              onClick={this.handleFormSubmitLogin}
            >Submit</button>
            {/* </Link> */}
          </form>



          <form id="register">
            <h3>Register New Account</h3>
            <div className="form-group">
              <label htmlFor="registerEmail">Username</label>
              <input
                type="text"
                className="form-control"
                id="registerEmail"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="userNameSignup"
                value={this.state.userNameSignup}
                onChange={this.handleInputChange} />
              <small id="emailHelp" className="form-text text-muted">Please Enter A Username</small>
            </div>

            <div className="form-group">
              <label htmlFor="registerPassword">Password</label>
              <input
                type="password"
                className="form-control"
                id="registerPassword"
                placeholder="Password"
                name="passwordSignup"
                value={this.state.passwordSignup}
                onChange={this.handleInputChange} />
              <small id="emailHelp" className="form-text text-muted">Please Enter A Password</small>
            </div>

            <div className="form-group">
              <label htmlFor="registerConfirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="registerConfirmPassword"
                placeholder="Password"
                name="rePassword"
                value={this.state.rePassword}
                onChange={this.handleInputChange} />
              <small id="emailHelp" className="form-text text-muted">Please Re-enter Your Password</small>
            </div>
            <Link to="/welcome">
              <button
                type="submit"
                className="btn btn-lg btn-dark"
                onClick={this.handleFormSubmitSignup}
              >Submit</button></Link>
          </form>
        </div>
      </>
    )
  }
}

export default Login;