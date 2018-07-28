import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListMessage from "./ListMessage";
import ButtonAppBar from "./ButtonAppBar";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputMessage from "./InputMessage";
import openSocket from 'socket.io-client';

let listTestMessages=["abc","123"];

const socket = openSocket('http://localhost:5000');

const creatConnection = () => {
  socket.emit("stream","Hello");
}


// const receiveData = (cb) => {
//   socket.on("stream",(image) => {
//     console.log(image);
//     listTestMessages.push(image);
//     cb(listTestMessages);
// });
// }
class App extends Component {
  state = {
    response: '',
    listMessage: ["abc","123"],
  };
  

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));

    socket.on("stream",(message) => {
      if(message !== null )
      {
        listTestMessages.push(message);
        this.setState({ listMessage : listTestMessages});
      }
    });
  }



  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    const { classes } = this.props;

    return (
      <div >
        <header >
          {/*<img src={logo} className="App-logo" alt="logo" >
          <h1 className="App-title">Welcome to React</h1> */}
          <div>
            <ButtonAppBar />
          </div>
        </header>
        {/*<p className="App-intro">{this.state.response}</p>*/}
        <div className="App" >
          <Button style={{backgroundColor:"red", margin: "20px"}} onClick={creatConnection}>Start Stream</Button>
          <Button style={{backgroundColor:"red", margin: "20px"}}>Watch Stream</Button>
        </div>
        <div className="ChatArea" >
            <ListMessage  listMessage={this.state.listMessage} />
        </div>
        <div>
          <InputMessage />
        </div>
        {/*<input className="Input-message" placeholder="Type ..." ></input>*/}
      </div>      
    );
  }
}

export default App;