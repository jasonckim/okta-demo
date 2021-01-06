import React from 'react';
import axios from 'axios';
import OKTA_CONfIG from "../../Okta-Configs";
import './EditProfile.css';
import Navigation from "../Navigation/Navigation";

class EditProfile extends React.Component<{},
{firstName:any,lastName:any,email:any,mobilePhone:any,profileInfo:any}> {
  constructor(props:any) {
    super(props);

      this.state = {
        firstName: '',
        lastName: '',
        email:'',
        mobilePhone:'',
        profileInfo: []
      };

    this.getProfile = this.getProfile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleMobilePhoneChange = this.handleMobilePhoneChange.bind(this);
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
  handleMobilePhoneChange(e:any) {
    this.setState({ mobilePhone: e.target.value });
  }

  handleSubmit(e:any){
    e.preventDefault();
    axios({
      method: 'post',
      url: '/api/v1/users/me',
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
          "mobilePhone": this.state.mobilePhone
        }
      }
    }).then((response) => {
      console.log(response)
    })
  }

  getProfile(){
    axios({
      method: 'get',
      url: '/api/v1/users/me',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': OKTA_CONfIG.Authorization
      }
    }).then((response) => {
      console.log(response.data)
      this.setState({profileInfo:response.data})
    })
  }

  componentDidMount(){
    this.getProfile();
  }

  render() {
    return (
      <div className="editprofile">
        <Navigation place="editprofile"/>
        <div className="editprofile-container">
          <div className="editprofile-form">
            <div className="editprofile-form-header">
              <h4>User Profile: {this.state.profileInfo?.profile?.firstName} {this.state.profileInfo?.profile?.lastName}</h4>
            </div>
            <div className="editprofile-form-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-element">
                  <label className="form-label-edit">First Name:</label>
                  <input
                    type="text"
                    id="firstName"
                    onChange={this.handleFirstNameChange}
                    placeholder={this.state.profileInfo?.profile?.firstName}
                    className="form-input-edit"
                  />
                </div>
                <div className="form-element">
                  <label className="form-label-edit">Last Name:</label>
                  <input
                    type="text"
                    id="lastName"
                    onChange={this.handleLastNameChange}
                    placeholder={this.state.profileInfo?.profile?.lastName}
                    className="form-input-edit"
                  />
                </div>
                <div className="form-element">
                  <label className="form-label-edit">Email:</label>
                  <input
                    type="text"
                    id="email"
                    onChange={this.handleEmailChange}
                    placeholder={this.state.profileInfo?.profile?.email}
                    className="form-input-edit"
                  />
                </div>
                <div className="form-element">
                  <label className="form-label-edit">Mobile Phone:</label>
                  <input
                    type="text"
                    id="mobilePhone"
                    onChange={this.handleMobilePhoneChange}
                    placeholder={this.state.profileInfo?.profile?.mobilePhone}
                    className="form-input-edit"
                  />
                </div>
                <button className="form-button" type="submit" id="submit">Save Changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;
