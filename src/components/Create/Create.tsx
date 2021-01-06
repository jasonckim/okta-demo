import React from 'react';
import axios from 'axios';
import OKTA_CONfIG from "../../Okta-Configs";
import './Create.css';
import Navigation from "../Navigation/Navigation";
import { Form, Button } from 'react-bootstrap';

class Create extends React.Component<{},
{firstName:any,
  lastName:any,
  email:any,
  login:any,
  password:any}> {
  constructor(props:any) {
    super(props);

      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        login: '',
        password: ''
      };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleFirstNameChange(e:any) {
    this.setState({ firstName: e.target.value });
  }
  handleLastNameChange(e:any) {
    this.setState({ lastName: e.target.value });
  }
  handleEmailChange(e:any) {
    this.setState({ email: e.target.value });
  }
  handlePasswordChange(e:any) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e:any){
    e.preventDefault();
    axios({
      method: 'post',
      url: '/api/v1/users?activate=true',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': OKTA_CONfIG.Authorization
      },
      data:{
        "profile": {
          "firstName": this.state.firstName,
          "lastName": this.state.lastName,
          "email": this.state.email,
          "login": this.state.email
        },
        "credentials":{
          "password": {"value": this.state.password}
        },
        "groupIds":[
          OKTA_CONfIG.standardGroupID
        ]
      }
    }).then((response) => {
      console.log(response)
    })
  }

  render() {
    return (
      <div className="createnewuser">
        <Navigation place="createnewuser"/>
        <div className="createnewuser-container">
          <div className="createnewuser-form">
            <div className="createnewuser-form-header">
              <h4>Create a New User</h4>
            </div>
            <div className="createnewuser-form-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-element">
                  <label className="form-label">First Name:</label>
                  <input
                    type="text"
                    id="firstName"
                    onChange={this.handleFirstNameChange}
                    className="form-input"
                  />
                </div>
                <div className="form-element">
                  <label className="form-label">Last Name:</label>
                  <input
                    type="text"
                    id="lastName"
                    onChange={this.handleLastNameChange}
                    className="form-input"
                  />
                </div>
                <div className="form-element">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    id="email"
                    onChange={this.handleEmailChange}
                    className="form-input"
                  />
                </div>
                <div className="form-element">
                  <label className="form-label">Password:</label>
                  <input
                    type="password"
                    id="password"
                    onChange={this.handlePasswordChange}
                    className="form-input"
                  />
                </div>
                <button className="form-button" type="submit" id="submit">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
