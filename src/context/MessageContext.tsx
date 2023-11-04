"use client"
import { createContext, useEffect, useState } from "react";
import { Timestamp, addDoc, collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/service/firebase";

interface MessageContextType {
    messages: [];
    sendMessage: (message:string, user:any) => void;
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
                createdAt: Timestamp.now(),
                profilePicture: `${user.photoURL}`,
                text: `${message}`,
                user: `${user.displayName}`,
            });
            console.log('Document written with ID:', docRef.id);
        } catch (error) {
            console.log(error);
        }
    }

    async function getMessages() {
        const data = await getDocs(collection(db, "messages"));
        {data
            ? setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            : alert("TESTE");
        };
    }

    const messagesRef = collection(db, 'messages');
    useEffect(() => {
        const queryMessages = query(messagesRef, orderBy('createdAt'));
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messages);
        });
        
        console.log("Render Snapshot");
        return () => unsuscribe();
    }, [])

    return (
        <MessageContext.Provider value={{ messages, sendMessage, getMessages }}>
            {children}
        </MessageContext.Provider>
    );
}