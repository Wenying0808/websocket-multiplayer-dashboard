"use client";

import ChatForm from "@/components/ChatForm";
import ChatMessage from "@/components/ChatMessage";
import { useState } from "react";

export default function Home() {
  type message = {
    sender: string;
    message: string;
  }

  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<message[]>([]);
  const [userName, setUserName] = useState("");

  const handleSendMessage = (message: string) => {
    console.log(message)
  }
  const handleJoinRoom = () => {
    setJoined(true)
  }
  return (
    <div className="flex mt-24 justify-center w-full">
      <div>
        {!joined 
          ? (
            <div className="flex flex-col gap-2 items-center justofy-center">
              <h1 className="mb-4 text-2xl font-bold">Join a room</h1>
              <input 
                type="text"
                placeholder="Enter user name"
                value={userName}
                onChange={(e) => {setUserName(e.target.value)}}
                className="w-64 px-4 py-2 border-2 rounded-lg"
              />
              <input 
                type="text"
                placeholder="Enter room name"
                value={userName}
                onChange={(e) => {setRoom(e.target.value)}}
                className="w-64 px-4 py-2 border-2 rounded-lg"
              />
              <button
                onClick={handleJoinRoom}
                className="px-4 py-2 text-white bg-blue-500 rounded-lg"
              >
                Join room
              </button>
            </div>) 
          : (
            <div className="w-full max-w-3xl mx-auto">
             <h1 className="mb-4 text-2xl font-bold">
              Room: {room}
              </h1>
              <div className="h-[500px] overflow-y-auto p-4 mb-4 bg-gray-100 border-2 rounded">
                {messages.map((msg, index) => (
                <ChatMessage 
                  key={index} 
                  sender={msg.sender} 
                  message={msg.message} 
                  isOwnMessage={msg.sender === userName}
                />
            ))}
          </div>
          <ChatForm onSendMessage={handleSendMessage}/>
        </div>
        )}
      </div>
      
    </div>
  );
}
