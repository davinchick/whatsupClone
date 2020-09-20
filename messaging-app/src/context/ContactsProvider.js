import React, {useContext} from 'react';
import useLocalStorage from '../hooks/uselocalStorage'

const ContactsContext = React.createContext()

export const useContacts = () => {
    return useContext(ContactsContext)
}

export function ContactsProvider({children}) {
    const [contacts, setContacts] = useLocalStorage('contacts', [])

    const createContact = (id, name) => {
        setContacts(prevContact => {
            return [...prevContact, {id, name}]
        })
    }

    return (
        <ContactsContext.Provider value={{contacts, createContact}}>
            {children}
        </ContactsContext.Provider>
    );
}