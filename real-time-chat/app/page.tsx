"use client";

import ChatForm from "@/components/ChatForm";

export default function Home() {
  const handleSendMessage = (message: string) => {
    console.log(message)
  }
  return (
    <div className="flex mt-24 justify-center w-full">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="mb-4 text-2xl font-bold">
          Room:
        </h1>
        <div className="">
          TODO: Add chat room
        </div>
        <ChatForm onSendMessage={handleSendMessage}/>
      </div>
    </div>
  );
}
