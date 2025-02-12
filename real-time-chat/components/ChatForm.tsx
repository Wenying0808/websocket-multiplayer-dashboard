"use client";

import React, { useState } from 'react'

type ChatFormProps = {
    onSendMessage: (message: string) => void;
}

const ChatForm: React.FC<ChatFormProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // empty the input after submit
        if(message.trim() !== ""){
            onSendMessage(message);
            setMessage("");
        }
        console.log("submitted")
    }
  return (
    <form onSubmit={handleSubmit} className='flex gap-2 mt-4'>
        <input 
            type="text" 
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Type your message here' 
            value={message}
            className='flex-1 px-4 py-2 rounded-lg border-2 focus:outline-none'
        />
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-lg">Send</button>
    </form>
  );
};

export default ChatForm
