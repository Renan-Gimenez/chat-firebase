"use client"
import { createContext, useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/service/firebase";

interface MessageContextType {
    messages: [];
    sendMessage: () => void;
    getMessages: () => void;
}

export const MessageContext = createContext<MessageContextType>({} as MessageContextType);

export const MessageProvider = ({ children }:any) => {
    const [messages, setMessages] = useState([]);
    
    async function sendMessage(message:string, user:any) {
        if (message.trim() === '') {
            alert('Preencha o campo de mensagem');
            return;
        }
    
        try {
            const docRef = await addDoc(collection(db, 'messages'), {
                profilePicture: `${user.photoURL}`,
                text: `${message}`,
                user: `${user.displayName}`,
            });
            console.log('Document written with ID:', docRef.id);
        } catch (error) {
            console.log(error);
        }
    
        getMessages();
    }

    async function getMessages() {
        const data = await getDocs(collection(db, "messages"));
        {data
            ? setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            : alert("TESTE");
        };
    }

    useEffect(() => {
        getMessages();
        console.log("Render");
    }, [])

    return (
        <MessageContext.Provider value={{ messages, sendMessage, getMessages }}>
            {children}
        </MessageContext.Provider>
    );
}