import React, {Component} from 'react';
import "./App.css";
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:5000');

class InputMessage extends Component{
    constructor(props)
    {
        super(props);
        this.state ={
            value : ''
        };
    }
    handleValue(event){
          //  console.log(event.target.value);
          this.setState({value : event.target.value});
    }
    handleSubmit(event){
        socket.emit("stream",this.state.value);
        //console.log(this.state.value);
        event.preventDefault();
        this.setState({value : ""});
    }

    render()
    {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
            <input className="Input-message" placeholder="Type Something ..." value={this.state.value} onChange={(event => this.handleValue(event))}></input>
            <input className ="Send-message" type="submit" value="Send"></input>
            </form>
        );
    }
}

export default InputMessage;