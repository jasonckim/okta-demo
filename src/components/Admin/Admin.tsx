import React from "react";
import Card from "react-bootstrap/Card";
import Navigation from "../Navigation/Navigation";
import axios from 'axios';
import OKTA_CONfIG from "../../Okta-Configs";
import './Admin.css';

class Admin extends React.Component<{}, {adminGroup:any, standardGroup:any}>{
  constructor(props:any){
    super(props);

    this.adminGroupList = this.adminGroupList.bind(this);
    this.standardGroupList = this.standardGroupList.bind(this);
    this.addToAdmin = this.addToAdmin.bind(this);
    this.removeFromAdmin = this.removeFromAdmin.bind(this);

    this.state = {
      adminGroup: [],
      standardGroup: []
    }
  }

  standardGroupList(){
    axios({
      method: 'get',
      url: `/api/v1/groups/${OKTA_CONfIG.standardGroupID}/users`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': OKTA_CONfIG.Authorization
      }
    }).then((response) => {
      console.log(response.data)
      this.setState({standardGroup:response.data})
    })
  }

  adminGroupList(){
    axios({
      method: 'get',
      url: `/api/v1/groups/${OKTA_CONfIG.adminGroupID}/users`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': OKTA_CONfIG.Authorization
      }
    }).then((response) => {
      console.log(response.data)
      this.setState({adminGroup:response.data})
    })
  }

  addToAdmin(userId:any){
    axios({
      method: 'put',
      url: `/api/v1/groups/${OKTA_CONfIG.adminGroupID}/users/${userId}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': OKTA_CONfIG.Authorization
      }
    }).then((response) => {
      console.log(response)
    })
  }

  removeFromAdmin(userId:any){
    axios({
      method: 'delete',
      url: `/api/v1/groups/${OKTA_CONfIG.adminGroupID}/users/${userId}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': OKTA_CONfIG.Authorization
      }
    }).then((response) => {
      console.log(response)
    })
  }


  componentDidMount(){
    this.adminGroupList();
    this.standardGroupList();
  }

  render(){
    return (
      <div className="admin">
        <Navigation place="admin" />
        <div className="admin-container">
          <div className="admin-header">
            <h2 className="pt-4 pb-5">Admin Area</h2>
          </div>
          <div className="content-container">
            <div className="flex-content admin">
              <h4 className="content-title pb-3 pt-3">All Users in Admin Group:</h4>
              <div className="admin-group-container">
                <div className="admin-group">
                  <table className="table-group">
                    <thead>
                      <tr>
                        <th className="table-group-header"><u>Name</u></th>
                        <th className="table-group-header"><u>Email</u></th>
                        <th className="table-group-header"><u>Remove from Admin</u></th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.adminGroup.map((admin:any) =>
                      <tr>
                        <td className="table-group-header">{admin.profile.firstName} {admin.profile.lastName}</td>
                        <td className="table-group-header">{admin.profile.email}</td>
                        <td className="table-group-header">
                          <button className="remove-admin" onClick={() => this.removeFromAdmin(admin.id)}>X</button>
                        </td>
                      </tr>
                    )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="flex-content standard pb-3 pt-3">
              <h4 className="content-title pb-3">All Users in Standard Group:</h4>
              <div className="standard-group">
                  <table className="table-group">
                    <thead>
                      <tr>
                        <th className="table-group-header"><u>Name</u></th>
                        <th className="table-group-header"><u>Email</u></th>
                        <th className="table-group-header"><u>Add to Admin</u></th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.standardGroup.map(
                      (standard:any) =>
                      <tr>
                        <td className="table-group-header">{standard.profile.firstName} {standard.profile.lastName}</td>
                        <td className="table-group-header">{standard.profile.email}</td>
                        <td className="table-group-header"><button className="add-admin" onClick={() => this.addToAdmin(standard.id)}>+</button></td>
                      </tr>
                    )}
                    </tbody>
                  </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default Admin;
