import React, {useState, useCallback} from 'react';
import {Form, InputGroup, Button} from 'react-bootstrap'
import {useConversations} from "../context/ConversationsProvider";

function OpenConversation() {

    const [text, setText] = useState('')
    // scroll to the lastest message
    const setRef = useCallback(node => {
        if(node) {
            node.scrollIntoView({smooth: true})
        }}, [])
    const {sendMessage, selectedConversation} = useConversations()


    const handleSubmit =(e) =>{
        e.preventDefault()
        sendMessage(selectedConversation.recipients.map(el => el.id),
                    text)
        setText('')
    }

    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column align-items-start justify-content-end px-3">
                    {selectedConversation.messages.map((mess, ind) => {
                        const lastMess = selectedConversation.messages.length -1 === ind
                        return (
                            <div key={ind}
                                 className={`my-1 d-flex flex-column ${mess.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                                 ref={lastMess ? setRef : null}
                            >
                                <div className={`rounded px-2 py-1 ${mess.fromMe ? 'bg-primary text-white' : 'border'}`}>
                                    {mess.text}
                                </div>
                                <div className={`text-muted small ${mess.fromMe ? 'text-right' : ''}`}>
                                    {mess.fromMe ? 'You' : mess.senderName}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control as="textarea" required value={text} onChange={e => setText(e.target.value)}
                            style={{height: '75%', resize: 'none'}}/>
                            <InputGroup.Append>
                                <Button type="submit">Send</Button>
                            </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    );
}

export default OpenConversation;