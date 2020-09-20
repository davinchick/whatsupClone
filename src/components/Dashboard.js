import React from 'react';
import Sidebar from './Sidebar'
import OpenConversation from "./OpenConversation";
import {useConversations} from "../context/ConversationsProvider";

function Dashboard({id}) {
    const {selectedConvers} = useConversations()

    return (
        <div className="d-flex" style={{height: '100vh'}}>
            <Sidebar id={id}/>
            {selectedConvers && <OpenConversation />}
        </div>
    );
}

export default Dashboard;
