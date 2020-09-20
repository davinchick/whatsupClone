import React, {useContext, useEffect, useState, useCallback} from 'react';
import useLocalStorage from '../hooks/uselocalStorage'
import {useContacts} from './ContactsProvider'
import {useSocket} from "./SocketProvider";

const ConversationsContext = React.createContext()

export const useConversations = () => {
    return useContext(ConversationsContext)
}

export function ConversationsProvider({id, children}) {
    const [conversations, setConversations] = useLocalStorage('conversations', [])
    const [selectConversInd, setSelectConversInd] = useState(0)
    const {contacts} = useContacts()
    const socket = useSocket()

    const createConversation =(recipients) => {
        setConversations(prevConv => {
            return [...prevConv, {recipients, messages: []}]
        })
    }

    const addMessageToConversation = useCallback(({recipients, text, sender}) => {
        setConversations(prev => {
            let madeChange = false
            const newMessage = { sender, text }
            const newConversation = prev.map(el => {
                if(arrayEquality(el.recipients, recipients)) {
                    madeChange = true
                    return {
                        ...el,
                        messages: [...el.messages, newMessage],
                    }
                }
                return el
            })

            if(madeChange) {
                return newConversation
            } else {
                return [...prev, {recipients, messages: [newMessage]}]
            }
        })
    }, [setConversations])

    useEffect(()=> {
        if(socket == null) return

        socket.on('receive-message', addMessageToConversation)
        return () => socket.off('receive-message')
    }, [socket, addMessageToConversation])


    const sendMessage = (recipients, text) => {
        socket.emit('send-message', {recipients, text})

        addMessageToConversation({recipients, text, sender: id})
    }

    const formattedConversations = conversations.map((convers, index) => {
        const recipients = convers.recipients.map(recipien => {
            const contact = contacts.find(el => {
                return el.id === recipien
            })
            const name = (contact && contact.name) || recipien
            return {id: recipien, name}
        })

        const messages = convers.messages.map(mess => {
            const contact = contacts.find(el => {
                return el.id === mess.sender
            })
            const name = (contact && contact.name) || mess.sender
            const fromMe = id === mess.sender

            return {...mess, senderName: name, fromMe}
        })

        const selected = index === selectConversInd
        return {...conversations, messages, recipients, selected}
    })

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectConversInd],
        selectConversInd: setSelectConversInd,
        sendMessage,
        createConversation
    }

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    );
}


function arrayEquality(a, b) {
    if(a.length !== b.length) return false

    a.sort()
    b.sort()

    return a.every((el, ind) => {
        return el === b[ind]
    })
}