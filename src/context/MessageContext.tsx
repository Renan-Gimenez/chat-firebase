"use client";
import { createContext, useEffect, useState } from "react";
import { db } from "@/service/firebase";
import {
  DocumentData,
  Query,
  QuerySnapshot,
  Timestamp,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

interface MessageType {
  createdAt: string;
  profilePicture: string;
  user: string;
  text: string;
  id: string;
  userUid: string;
  sendedByMe: boolean;
}

interface MessageContextType {
  messages: MessageType[];
  sendMessage: (message: string, user: any) => void;
  getMessages: () => void;
}

export const MessageContext = createContext<MessageContextType>(
  {} as MessageContextType
);

export const MessageProvider = ({ children }: any) => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  async function sendMessage(message: string, user: any) {
    if (message.trim() === "") {
      alert("Preencha o campo de mensagem");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "messages"), {
        createdAt: Timestamp.now(),
        profilePicture: user.photoURL,
        text: message,
        user: user.displayName,
        userUid: user.uid,
      });
      console.log("Document written with ID:", docRef.id);
    } catch (error) {
      console.log(error);
    }
  }

  async function getMessages() {
    try {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        collection(db, "messages")
      );

      setMessages(
        querySnapshot.docs.map((doc) => ({
          ...(doc.data() as MessageType),
          id: doc.id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const queryMessages = query(
      collection(db, "messages"),
      orderBy("createdAt")
    ) as Query<MessageType>;

    const unsubscribe = onSnapshot(
      queryMessages,
      (snapshot: QuerySnapshot<MessageType>) => {
        const updatedMessages: MessageType[] = [];
        snapshot.forEach((doc) => {
          updatedMessages.push({ ...doc.data(), id: doc.id });
        });
        setMessages(updatedMessages);
      }
    );

    console.log("Render Snapshot");
    return () => unsubscribe();
  }, []);

  return (
    <MessageContext.Provider value={{ messages, sendMessage, getMessages }}>
      {children}
    </MessageContext.Provider>
  );
};
