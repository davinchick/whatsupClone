import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useContacts} from '../context/ContactsProvider'
import {useConversations} from '../context/ConversationsProvider'

function NewConversationModal({closeModal}) {
    const [selectedContactIds, setSelectedContactIds] = useState()
    const {contacts} = useContacts()
    const {createConversation } = useConversations()

    const handleSubmit =(e)=> {
        e.preventDefault()
        createConversation(selectedContactIds)
        closeModal()
    }

    const handleCheckbox = (newId) => {
        setSelectedContactIds(prev=> {
            if(prev.includes(newId)){
                return prev.filter(el => {
                    return prev !== el
                })
            } else {
                return [...prev, newId]
            }
        })
    }

    return (
        <>
            <Modal.Header closeButton>Create Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map(el => (
                        <Form.Group controlId={el.id} key={el.id}>
                            <Form.Check type="checkbox"
                                        value={selectedContactIds.includes(el.id)}
                                        label={el.name}
                                        onChange={()=> handleCheckbox(el.id)}/>
                        </Form.Group>
                    ))}
                    <Button type="submit">Create</Button>
                </Form>
            </Modal.Body>
        </>
    );
}

export default NewConversationModal;
