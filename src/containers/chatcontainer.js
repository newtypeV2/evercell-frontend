import React from 'react';
import ChatBox from '../components/chatbox';

class ChatContainer extends React.Component{
    render(){
        return(
            <React.Fragment>
            {
            this.props.characterObj ?
            <div id="chatcontainer">
                <ChatBox />
                <div id="chatform">
                <input type="text" className="chatcomponent"/>
                <input type="submit" className="chatcomponent"/>
                </div>
            </div>
            :
            null
            }
            </React.Fragment>
        )
    }
}

export default ChatContainer