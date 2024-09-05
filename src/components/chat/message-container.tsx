import React, { useEffect } from "react";
import ChatTopbar from "./topbar";
import MessageList from "./message-list";
import ChatBottombar from "./bottombar";
import { useSelectedUser } from "@/store/use-selected-user";

const MessageContainer = () => {
  const { setSelectedUser } = useSelectedUser();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedUser(null);
    };

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [setSelectedUser]);

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar />
      <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
        <MessageList />
        <ChatBottombar />
      </div>
    </div>
  );
};

export default MessageContainer;
