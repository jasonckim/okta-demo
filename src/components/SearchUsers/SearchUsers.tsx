import React from 'react';
import axios from 'axios';
import OKTA_CONfIG from "../../Okta-Configs";
import './SearchUsers.css';
import Navigation from "../Navigation/Navigation";

class SearchUsers extends React.Component<{}, {userList:any,searchResults:any,searchTerm:any}>{
  constructor(props:any){
    super(props);

    this.state = {
      userList: [],
      searchResults: [],
      searchTerm: []
    }

    this.handleTermChange = this.handleTermChange.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
    this.deactivateUser = this.deactivateUser.bind(this);
  }

  handleTermChange(e:any) {
    this.setState({
      searchTerm : e.target.value
    })
  }

  searchUsers(query:any){
    axios({
      method: 'get',
      url: `/api/v1/users?q=${query}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': OKTA_CONfIG.Authorization
      }
    }).then((response) => {
      console.log(response.data)
      this.setState({searchResults:response.data})
    })
  }

  deactivateUser(userId:any){
    axios({
      method: 'post',
      url: `/api/v1/users/${userId}/lifecycle/deactivate`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': OKTA_CONfIG.Authorization
      }
    }).then((response) => {
      console.log(response)
    })
  }

  render(){
    return(
      <div className="searchusers">
        <Navigation place="createnewuser"/>
        <div className="searchusers-container">
          <div className="searchusers-header">
            <h2 className="pt-4 pb-5">Search Users</h2>
          </div>
          <div className="searchusers-content">
            <div className="search-bar">
              <div className="search-input">
                <input
                  placeholder="Search Users"
                  onChange={e => this.handleTermChange(e)}
                  value={this.state.searchTerm}
                  className="search-input"
                />
              </div>
              <div className="search-submit">
                <button className="search-button" onClick={()=>this.searchUsers(this.state.searchTerm)}>Search</button>
              </div>
            </div>
            <div className="search-results">
              <div>
                <div className="search-results-header">
                  <h4>Search Results:</h4>
                </div>
                <table>
                  <thead>
                  <tr>
                    <th className="table-group-header">Name:</th>
                    <th className="table-group-header">Email:</th>
                    <th className="table-group-header">Status:</th>
                    <th className="table-group-header">Deactivate:</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.searchResults.map((search:any)=>
                    <tr>
                      <td className="table-group-header">{search.profile.firstName} {search.profile.lastName}</td>
                      <td className="table-group-header">{search.profile.email}</td>
                      <td className="table-group-header">{search.status}</td>
                      <td className="table-group-header-button"><button className="deactivate-button" onClick={() => this.deactivateUser(search.id)}>Deactivate</button></td>
                    </tr>
                  )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchUsers;
