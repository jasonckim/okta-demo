import React from "react";
import Card from "react-bootstrap/Card";
import Navigation from "../Navigation/Navigation";
import './Standard.css';

const Standard = () =>{

  return (
    <div className="standard">
      <Navigation place="standard" />
      <div className="standard-container">
        <div className="standard-wrapper pt-3">
          <div className="standard-header">
            <h2 className="pt-1">Protected Area</h2>
          </div>
          <div className="standard-content">
            <div className="standard-paragraph">
              <p>This page is only viewable to authenticated users. <br/>However this does not include Admin authorization.</p>
            </div>
          </div>
          <div className="standard-tech-container pb-3">
            <div className="standard-tech-header">
              <h2 className="pt-3">Technologies Used:</h2>
            </div>
            <div className="standard-tech-content">
              <div className="standard-tech-paragraph">
                <ul>
                  <li>
                    Language/SDK: <a className="tech-links" href="https://reactjs.org/" target="_blank">React JS</a>
                  </li>
                  <li>
                    JavaScript (NPM) Packages:
                  </li>
                    <li className="inside-list">
                      Okta React SDK: <a className="tech-links" href="https://www.npmjs.com/package/@okta/okta-react" target="_blank">@okta/okta-react</a>
                    </li>
                    <li className="inside-list">
                      Rent The Runway: <a className="tech-links" href="https://github.com/RentTheRunway/rtr-react-okta-auth" target="_blank">@rtr-react-okta-auth</a>
                    </li>
                    <li className="inside-list">
                       HTTP Proxy Middleware: <a className="tech-links" href="https://www.npmjs.com/package/http-proxy-middleware" target="_blank">@http-proxy-middleware</a>
                    </li>
                  <li>
                    Okta APIs:
                  </li>
                    <li className="inside-list">
                      Users: <a className="tech-links" href="https://developer.okta.com/docs/reference/api/users" target="_blank">developer.okta.com/docs/reference/api/users</a>
                    </li>
                    <li className="inside-list">
                      Groups: <a className="tech-links" href="https://developer.okta.com/docs/reference/api/groups/" target="_blank">developer.okta.com/docs/reference/api/groups/</a>
                    </li>
                    <li className="inside-list">
                      Authentication: <a className="tech-links" href="https://developer.okta.com/docs/reference/api/oidc/" target="_blank">developer.okta.com/docs/reference/api/oidc/</a>
                    </li>
                  <li>
                    Okta Developer Console:
                  </li>
                    <li className="inside-list">
                      <a className="tech-links" href="https://jasonkim-media.s3-us-west-1.amazonaws.com/Projects/images/Okta/dev-dashboard.png" target="_blank">Dashboard</a>
                    </li>
                    <li className="inside-list">
                      <a className="tech-links" href="https://jasonkim-media.s3-us-west-1.amazonaws.com/Projects/images/Okta/dev-apps.png" target="_blank">Applications</a>
                    </li>
                    <li className="inside-list">
                      <a className="tech-links" href="https://jasonkim-media.s3-us-west-1.amazonaws.com/Projects/images/Okta/dev-users.png" target="_blank">Users</a>
                    </li>
                    <li className="inside-list">
                      <a className="tech-links" href="https://jasonkim-media.s3-us-west-1.amazonaws.com/Projects/images/Okta/dev-groups.png" target="_blank">Groups</a>
                    </li>
                </ul>
              </div>
              <div className="standard-tech-paragraph">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Standard;
