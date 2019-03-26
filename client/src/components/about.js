import React, { Component } from 'react';

const About=(props)=>{
  return(
    <div>
    <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <h2 className="font-weight-bold">THIS IS DEVELOPED BY PRAKASHUJJWAL1010</h2>
      <div>
        <h4 className="font-weight-bold">THIS IS AN IMPLEMENTATION OF AN IMAGE UPLOADER WHICH UPLOADS ENCRYPTED IMAGE TO SERVER.</h4>
        <h4 className="font-weight-bold">SERVER THEN DECRYPTS THE IMAGE AND STORE IT.</h4>
        <br></br>
        <a className="btn btn-primary btn-block font-weight-bold"href="https://github.com/prakashujjwal1010">GITHUB</a>
      </div>
      </div>
    </div>
    </div>
  );
}

export default About;
