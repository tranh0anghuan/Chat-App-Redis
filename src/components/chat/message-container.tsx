import React from "react";
import ChatTopbar from "./topbar";
import MessageList from "./message-list";
import ChatBottombar from "./bottombar";

const MessageContainer = () => {
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar />
      <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
        <MessageList />
      </div>
      <ChatBottombar />
    </div>
  );
};

export default MessageContainer;
