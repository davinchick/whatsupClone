import {useEffect, useState} from 'react';

const PREFIX = "whatsapp-"

export default function useLocalStorage(key, initial) {
    const prefixKey = PREFIX + key
    const [value, setValue] = useState(() => {
        const jsonval = localStorage.getItem(prefixKey)
        if(jsonval !== null) {
            return JSON.parse(jsonval)
        } else if(typeof initial === 'function') {
            return initial()
        } else {
            return initial
        }
    })

    useEffect(() => {
        localStorage.setItem(prefixKey, JSON.stringify(value))
    }, [prefixKey, value])

    return [value, setValue]
}