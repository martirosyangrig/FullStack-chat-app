import { Avatar, Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../helpers/baseUrl";
import NewRoomModal from "./Modal";
import { IChatRoom, IUser } from "../../interfaces";

import styles from "./chatRooms.module.scss";

export default function ChatRooms() {
  const [myInfo, setMyInfo] = useState<IUser>();
  const [chatRooms, setChatRooms] = useState<IChatRoom[]>([]);

  const navigate = useNavigate();

  const getMyInfo = () => {
    const user = JSON.parse(sessionStorage.getItem("user") as string);
    setMyInfo(user);
  };

  const getChatRooms = async () => {
    const { data }: { data: IChatRoom[] } = await axios.get(
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

  const createRoom = async (roomName: string) => {
    try {
      const { data }:  { data: IChatRoom } = await axios.post(`${baseUrl}chat-rooms`, {
        name: roomName,
      });
      setChatRooms((prevChatRooms) => [...prevChatRooms, data]);
    } catch (error) {
      console.log(error);
    }
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
          <NewRoomModal createRoom={createRoom} />
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
