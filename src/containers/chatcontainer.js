import React from 'react';
import ChatBox from '../components/chatbox';

class ChatContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            message : ""
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            message : e.target.value
        })
    }

    onSubmitHandler = (e) => {
        this.props.sendMessage(this.state.message)
        e.preventDefault();
        this.setState({
            message : ""
        })
    }


    render(){
        return(
            <React.Fragment>
            {
            this.props.characterObj ?
            <div id="chatcontainer">
                <ChatBox 
                    messages={this.props.messages}
                />
                <div id="chatform">
                    <form onSubmit={this.onSubmitHandler}>
                        <input type="text" className="chatcomponent" value={this.state.message} onChange={this.onChangeHandler}/>
                        <input type="submit" className="chatcomponent" value="Send" onClick={this.onSubmitHandler} onSubmit={this.onSubmitHandler}/>
                    </form>
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