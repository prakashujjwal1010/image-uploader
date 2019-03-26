import React, { Component } from 'react';
import axios from 'axios';
const aes = require('.././utils/aes_utils.js');
//const LZUTF8 = require('lzutf8');

const config = {
  headers : {
    'content-type' : 'multipart/form-data'
  }
};

class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      selected : null,
      name : "",
      mime : "",
      str : "",
      base64str : ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.readFile = this.readFile.bind(this);
  }

  readFile(file){
    return new Promise(function(resolve,  reject){
      let myReader = new FileReader();
      myReader.readAsDataURL(file);
      myReader.onloadend = function(e){
        resolve(myReader.result);
      };

    }
    )
  }
postData(fd){
  //sending encrypted base64str to server as a post request
  return new Promise(function(resolve, reject){
    axios.post('/api/upload', fd, config)
    .then(function(res){
       resolve(res);
     })
     .catch(function(err){
       resolve(err);
     });
  })

}
  handleChange(event){
    let file = event.target.files[0];
    if(file){
      let self = this;
      this.setState({
        selected : file,
        name : file.name
      });
      this.readFile(file)
        .then(function(dataUrl){

          console.log(dataUrl);

          let arr = dataUrl.split(',');
          let mime = arr[0].match(/:(.*?);/)[1];
          console.log(mime);
          //extracting base64 string by data uri
          let base64str = dataUrl.split(';base64,').pop();

          //updating states
           self.setState({
             str : dataUrl,
             mime : mime,
             base64str : base64str
           });
        });
    }

  }

  handleClick(event){
    let encodedStr = aes.encrypt(this.state.base64str);
    console.log(this.state.base64str.length);
    console.log(encodedStr.length);
    //creating an instance of FormData
    let fd = new FormData();
    let bstr = atob(encodedStr);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while(n--){
       u8arr[n] = bstr.charCodeAt(n);
    }
    let fileObj =  new File([u8arr], this.state.name, {type : this.state.mime, lastModified : Date.now()});
    fd.append('encryptedImg', fileObj);
    console.log(fileObj);
    this.postData(fd)
    .then(function(res){
      console.log(res);
    });
  }

  render(){
    return(
      <div>
        <div className = "jumbotron jumbotron-fluid">
        <h1 className = "display-1 font-weight-bold">IMAGE UPLOADER</h1>
        </div>
        <br />
        <br />
        <p className = "font-weight-bold">CHOOSE IMAGE TO UPLOAD</p>
        <input type="file" className="form-control btn btn-block btn-primary" onChange={this.handleChange}/>
        <button type="button" className="btn btn-primary btn-block" onClick={this.handleClick} >UPLOAD</button>
        <br />
        <br />
        <img src={this.state.str} alt="image" height = "200" />
      </div>
    );
  }
}

export default Home;
