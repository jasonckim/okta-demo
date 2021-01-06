import React from "react";
import Card from "react-bootstrap/Card";
import Navigation from "../Navigation/Navigation";
import './Home.css';

const Home = () =>{

  return (
    <div className="home">
      <Navigation place="home"/>
      <div className="home-container">
      <div className="home-wrapper">
        <div className="home-content">
          <div className="home-header">
            <h2 className="pt-4">Okta Demo</h2>
          </div>
          <div className="paragraph-container">
            <div className="home-paragraph">
              <p className="pb-2">Created By: Jason Kim</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Home;
