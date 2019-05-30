import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, ToastStore } from 'react-toasts';

import './Login.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginVisible: true,
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            zip: "",
        }
    }

    toggleRegister = () => {
        this.setState({
            isLoginVisible: !this.state.isLoginVisible
        })
    }
    handleFirstNameInput = (e) => {
        this.setState({
            firstName: e.target.value
        })
    }
    handleLastNameInput = (e) => {
        this.setState({
            lastName: e.target.value
        })
    }
    handleEmailInput = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    handleUsernameInput = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    handlePasswordInput = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    handleZipInput = (e) => {
        this.setState({
            zip: e.target.value
        })
    }
    handleLoginSubmit = (e) => {
        e.preventDefault();
        let { username, password } = this.state;
        let loginInfo = { username, password };
        axios.post('/auth/login', loginInfo).then(result => {
            this.props.getCurrentUser();
            ToastStore.success("Welcome back!  Let's get started.", 4000, 'toast-success');
        }).catch(error => {
            console.log('Error from Login.js => handleLoginSubmit', error);
            ToastStore.error("Email/Password incorrect.  Please try again.", 4000, 'toast-error')
        })
        this.setState({
            username: "",
            password: ""
        })
    }
    handleRegisterSubmit = (e) => {
        e.preventDefault();
        let { firstName, lastName, username, password, email, zip } = this.state;
        let newUserInfo = { firstName, lastName, username, password, email, zip };
        axios.post('/auth/register', newUserInfo).then(result => {
            let loginInfo = { username: newUserInfo.username, password: newUserInfo.password };
            axios.post('/auth/login', loginInfo).then(response => {
                this.props.addScratchPad();
                ToastStore.success("Sign-up successful!", 4000, 'toast-success');
            }, () => {
                this.props.getCurrentUser();
            })
        }).catch(error => {
            console.log("Error from Login.js => handleRegisterSubmit", error);
            ToastStore.error("Registration failed... Our team is on it!", 4000, 'toast-error')
        })
        this.setState({
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            zip: "",
        })
    }

    render() {
        let { firstName, lastName, username, email, password, zip } = this.state;
        let loginSubmitEnabled = username && password;
        let registerSubmitEnabled = firstName && lastName && username && email && password && zip
        return (
            <div>
                <div>

                    {
                        this.state.isLoginVisible
                            ?
                            <div>
                                <div>
                                    <h1>Welcome to Balance</h1>
                                </div>
                                <div>
                                    <div>
                                        <form onSubmit={this.handleLoginSubmit} styles={{ display: 'block' }} id="form1">
                                            <p>USERNAME</p>
                                            <input type="submit text" autoFocus="true" onChange={this.handleUsernameInput} value={this.state.username}></input>
                                            <p>PASSWORD</p>
                                            <input type="password" onChange={this.handlePasswordInput} value={this.state.password}></input>
                                        </form>
                                    </div>
                                    <div>
                                        <button type="submit" form="form1" disabled={!loginSubmitEnabled} id="login-submit">SUBMIT</button>
                                        <button onClick={this.toggleRegister}>REGISTER</button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                <div>
                                    <h1>Please Register Below</h1>
                                </div>
                                
                                <div>
                                    <div>
                                        <form onSubmit={this.handleRegisterSubmit} styles={{ display: 'block' }} id="form2">
                                            <p>FIRST NAME</p>
                                            <input type="submit text" onChange={this.handleFirstNameInput} value={this.state.firstName} autoFocus="true"></input>
                                            <p>LAST NAME</p>
                                            <input type="submit text" onChange={this.handleLastNameInput} value={this.state.lastName} ></input>
                                            <p>EMAIL</p>
                                            <input type="submit text" onChange={this.handleEmailInput} value={this.state.email}></input>
                                            <p>USERNAME</p>
                                            <input type="submit text" onChange={this.handleUsernameInput} value={this.state.username}></input>
                                            <p>PASSWORD</p>
                                            <input type="password" onChange={this.handlePasswordInput} value={this.state.password}></input>
                                            <p>ZIP CODE</p>
                                            <input type="submit text" onChange={this.handleZipInput} value={this.state.zip} placeholder="xxxxx-xxxx"></input>
                                        </form>
                                    </div>
                                    <div>
                                        <button type="submit" form="form2" disabled={!registerSubmitEnabled} id="register-submit">SUBMIT</button>
                                        <button onClick={this.toggleRegister}>LOGIN</button>
                                    </div>
                                </div>/l
                            </div>
                    }
                </div>
                <ToastContainer store={ToastStore} position={ToastContainer.POSITION.BOTTOM_RIGHT} />
            </div>
        )
    }
}


export default Login;