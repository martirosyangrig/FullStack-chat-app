import { Avatar, Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../helpers/baseUrl";

import styles from "./chatRooms.module.scss";

interface MyInfo {
  id: string;
  name?: string;
  img?: string;
}

interface IChatRooms {
  name: string;
  id: string;
}

export default function ChatRooms() {
  const [myInfo, setMyInfo] = useState<MyInfo>();
  const [chatRooms, setChatRooms] = useState<IChatRooms[]>([]);

  const navigate = useNavigate();

  const getMyInfo = () => {
    const user = JSON.parse(sessionStorage.getItem("user") as string);
    setMyInfo(user);
  };

  const getChatRooms = async () => {
    const { data }: { data: IChatRooms[] } = await axios.get(
      `${baseUrl}chat-rooms`
    );
    if (!data) return;
    setChatRooms(data);
  };

  useEffect(() => {
    getMyInfo();
    getChatRooms();
  }, []);

  const handleDeleteChatRoom = async (id: string) => {
    await axios.delete(`${baseUrl}chat-rooms/${id}`);
    getChatRooms();
  };

  const joinRoom = (index: string) => {
    navigate(`/chatroom/${index}`);
  };

  return (
    <Box className={styles.wraper}>
      <Box className={styles.continer}>
        <Box className={styles.myInfo}>
          <Avatar
            alt="User Avatar"
            src={myInfo?.img || "default_url"}
            sx={{
              width: 100,
              height: 100,
              margin: "10px auto",
              display: "block",
            }}
          />
          <Box className={styles.myUserName}>{myInfo?.name}</Box>
        </Box>
        {chatRooms?.map((el, index) => {
          return (
            <div className={styles.chatrooms}>
              <Typography
                className={styles.roomName}
                onClick={(e) => joinRoom(el?.id)}
              >
                {el.name + index}
              </Typography>
              <Button
                onClick={(e) => handleDeleteChatRoom(el.id)}
                className={styles.deleteRoom}
              >
                X
              </Button>
            </div>
          );
        })}
      </Box>
    </Box>
  );
}
