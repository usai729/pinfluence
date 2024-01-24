import React from "react";
import Nav from "./Nav";
import ChatList from "./Chats/ChatList";
import ChatBox from "./Chats/ChatBox";

export default function Chats() {
  return (
    <>
      <Nav />

      <div className="flex items-center justify-center w-screen h-screen p-14">
        <div className="flex bg-white m-10 pl-3 rounded-2xl shadow-2xl h-[80vh] w-screen">
          <ChatList />
          <ChatBox />
        </div>
      </div>
    </>
  );
}
