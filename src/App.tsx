import React, { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Security, ImplicitCallback } from "@okta/okta-react";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import Standard from "./components/Standard/Standard";
import EditProfile from "./components/EditProfile/EditProfile";
import Create from "./components/Create/Create";
import SearchUsers from "./components/SearchUsers/SearchUsers";
import OKTA_CONfIG from "./Okta-Configs";
import './App.css';
import {
  AuthContext,
  AuthContextProvider,
  useAuthContextState,
  RouteWhenMemberOfAny,
  withAuthAwareness,
} from "@rent-the-runway/rtr-react-okta-auth";

const authCallbackUrl = "/implicit/callback";
const config = {
  issuer: `https://dev-${OKTA_CONfIG.issuerId}.okta.com/oauth2/default`,
  redirectUri: `${window.location.origin}${authCallbackUrl}`,
  clientId: OKTA_CONfIG.clientId,
  pkce: true
};

function AppInner(){
    const authContextState = useContext(AuthContext);
    const availableGroups = authContextState.groups.join(" | ");

  return (
    <div className="app">
      <div className="app-container">
      <div className="group-border">
        <b>Groups I Belong To:</b> {availableGroups}
      </div>
        <Route path="/" exact={true} component={Home} />
        <RouteWhenMemberOfAny
          groups={["standard", "admin"]}
          path="/protected"
          exact={true}
          component={Standard}
        />
        <RouteWhenMemberOfAny
          groups={["admin"]}
          path="/admin"
          exact={true}
          component={Admin}
        />
        <RouteWhenMemberOfAny
          groups={["admin"]}
          path="/editprofile"
          exact={true}
          component={EditProfile}
        />
        <RouteWhenMemberOfAny
          groups={["admin"]}
          path="/createnewuser"
          exact={true}
          component={Create}
        />
        <RouteWhenMemberOfAny
          groups={["admin"]}
          path="/search"
          exact={true}
          component={SearchUsers}
        />
      </div>
    </div>
  );
};

const AuthApp = withAuthAwareness(AppInner);

const App = () =>{
  const authContextState = useAuthContextState();

  return (
    <AuthContextProvider value={authContextState}>
      <Router>
        <Security {...config}>
          <AuthApp />
          <Route path={authCallbackUrl} component={ImplicitCallback} />
        </Security>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
