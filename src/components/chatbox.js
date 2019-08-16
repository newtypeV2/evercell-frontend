import React from 'react';

const ChatBox = (props) => {

    const   renderMessages = () =>{        
        let last5Messages = props.messages.slice(-4)
        let array = last5Messages.map((message, index) => 
            <div key={index} className="message">{message}</div>
            )
        return array
    }

    const renderSpacer = () => {
        let spacerCount = 4 - props.messages.length
        let spacer = []
        for(let i = 0; i < spacerCount; i++){
            spacer.push(<div key={i}>.</div>)
        }
        return spacer
    }

    return(
        <div id="chatmessages">
            { props.messages.length < 4 ? renderSpacer() : null}
            { props.messages.length !== 0 ? renderMessages() : null }
        </div>
    )
}

export default ChatBox