import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {Redirect , withRouter} from 'react-router-dom';
import { LOGIN_API } from '../constants';
import LoginCarousel from './logincarousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.currentTarget.name] : e.currentTarget.value
        })
    }

    loginHandler = (e) => {
        e.preventDefault();
        e.persist();
        const data = this.state
        fetch(LOGIN_API,{
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if(data.userinfo){
                let userObj = JSON.parse(data.userinfo)
                localStorage.setItem("jwt",data.token)
                this.props.loginUser(userObj)
                this.props.history.push("/")
            }else{
                alert("USERNAME/PASSWORD INCORRECT!!")
            }
        })
    }

    render(){
            return (
                this.state.loggedIn ? <Redirect to="/characters" /> :
                <div className="loginContainer">
                <div id="loginForm">
                    <Form >
                    <Form.Group controlId="formGroupUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="username" name="username" placeholder="Enter username" onChange={this.onChangeHandler} />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" onChange={this.onChangeHandler}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.loginHandler} onSubmit={this.loginHandler}>Submit</Button>
                    </Form>
                </div>
                <div id='loginInfo'>
                    <div>4 Accounts are available for use:</div>
                    <div>Username: Player1-4, example: Player1</div>
                    <div>Password: password</div>
                </div>
                <LoginCarousel/>
               </div>
           )
    }
}

export default withRouter(Login)