import { Avatar, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import emit, { useSocket } from "../../hooks/useSocket";
import formatTimestamp from "../../helpers/formatTimeStamp";

import styles from "./chatRoom.module.scss";

export default function ChatRoom() {
  const [message, setMessage] = useState<string>("");
  const [userInfo, setUserInfo] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState<any>([]);
  const [roomHistoryMessages, setRoomHistoryMessages] = useState<any>([]);

  const messageContainerRef = useRef<HTMLDivElement>(null);

  const { id } = useParams();

  useSocket("message", (data: any) => {
    setRoomHistoryMessages(data.messages);
  });

  useSocket("joinedRoom", (data: any) => {
    setRoomHistoryMessages(data.messages);
    setOnlineUsers(data.onlineUsers);
  });

  useSocket("leftedRoom", (data: any) => {
    setOnlineUsers(data.onlineUsers);
  });

  const sendMessage = () => {
    if (message.trim() !== "") {
      emit("sendMessage", { roomId: id, message: message });
    }

    setMessage("");
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user") as string);

    emit("joinRoom", { roomId: id, user });

    return () => {
      emit("leftRoom", {});
    };
  }, [id]);

  const getUserInfo = () => {
    const user = JSON.parse(sessionStorage.getItem("user") as string);
    setUserInfo(user);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!e.target.value.trim()) return;

    setMessage(e.target.value);
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight + 100;
    }
  }, [roomHistoryMessages]);

  return (
    <Box className={styles.wraper}>
      <Box className={styles.onlineUsers}>
        {onlineUsers.map((el: any) => {
          return <div className={styles.users}>{el.user?.name}</div>;
        })}
      </Box>
      <Box className={styles.messageWraper}>
        <Box className={styles.messageContiner} ref={messageContainerRef}>
          {roomHistoryMessages.map((el: any) => {
            return (
              <div
                className={
                  el.id === userInfo.id ? styles.messageMine : styles.message
                }
              >
                <Box className={styles.senderInfo}>
                  <Avatar
                    alt="User Avatar"
                    src={el.image || "default_image_url"}
                    sx={{
                      width: 30,
                      height: 30,
                    }}
                  />
                  <span className={styles.senderName}>{el.sender}</span>
                </Box>
                <span className={styles.messageText}>{el.text}</span>
                <span>{formatTimestamp(el.timestamp)}</span>
              </div>
            );
          })}
        </Box>
        <Box className={styles.inputContiner}>
          <textarea
            value={message}
            onChange={handleInputChange}
            className={styles.textarea}
            placeholder="Write your message here..."
            rows={4}
          />
          <button onClick={sendMessage}>Send</button>
        </Box>
      </Box>
    </Box>
  );
}
