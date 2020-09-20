import React from 'react';
import {ListGroup} from "react-bootstrap";
import { useConversations } from '../context/ConversationsProvider'

function Conversations() {
    const { conversations, selectConversInd} = useConversations()

    return (
        <ListGroup variant="flush">
            {conversations.map((el, ind) => (
                <ListGroup.Item key={ind}
                                action
                                active={el.selected}
                                onClick={() => selectConversInd(ind)}>
                    {el.recipients.map(el => el.name).join(', ')}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}

export default Conversations;
