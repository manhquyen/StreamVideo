import React, {Component} from 'react';
import './App.css';
import Message from './Message';

class ListMessage extends Component{

    renderMessage(message)
    {
        //return <Message message={message} />;
        return (<li>{message}</li>)
    }
    renderMessages(listMessage)
    {
        return listMessage.map( message => this.renderMessage(message));
    }
    render(){
        return(
            <ul className="List-messages" >{this.renderMessages(this.props.listMessage)}</ul>
        )
    }
}

export default ListMessage;