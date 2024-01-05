"use client";
import { useContext, useRef, useEffect } from "react";

import { AuthContext } from "@/context/AuthContext";
import { MessageContext } from "@/context/MessageContext";

import Message from "@/components/Message";
import Header from "@/components/Header";

import { Loader, SendHorizonal } from "lucide-react";

export default function Home() {
  const messageRef = useRef<HTMLInputElement | null>(null);

  const { user, loadingUserState } = useContext(AuthContext);
  const { messages, sendMessage }: any = useContext(MessageContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (loadingUserState) {
    return (
      <div className="h-screen w-screen flex items-center justify-center ring ring-red-500 bg-gray-900">
        <Loader className="h-10 w-auto text-white animate-spin" />
      </div>
    );
  }

  return (
    <main className="h-screen flex flex-col dark:bg-gray-900 items-center">
      <Header />

      <section className="h-full w-full pt-16 flex flex-1 flex-col items-center justify-self-end">
        <div className="h-full w-full sm:w-[50%] overflow-y-scroll flex flex-1 flex-col gap-1 p-4">
          {messages.map((item: any, index: number) => {
            return (
              <Message
                key={index}
                createdAt={item.createdAt}
                profilePicture={item.profilePicture}
                user={item.user}
                text={item.text}
                userUid={item.userUid}
                sendedByMe={item.userUid === user?.uid}
              />
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        <form
          action="#"
          className="w-full flex gap-2 px-4 py-2 bg-zinc-200 dark:bg-gray-700 justify-self-end"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(messageRef.current?.value, user);

            if (messageRef.current) {
              messageRef.current.value = "";
            }
          }}
        >
          <input
            className="w-full px-4 py-2 bg-transparent outline-none rounded-xl bg-white dark:bg-gray-600"
            type="text"
            placeholder="Digite sua mensagem..."
            ref={messageRef}
          />

          <button className="h-12 w-12 flex items-center justify-center rounded-xl bg-white dark:bg-gray-600">
            <SendHorizonal />
          </button>
        </form>
      </section>
    </main>
  );
}
