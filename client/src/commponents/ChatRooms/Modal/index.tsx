import { Box, Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

import styles from "./modal.module.scss";

interface INewRoomModalProps {
  createRoom: (roomName: string) => void;
}

export default function NewRoomModal({ createRoom }: INewRoomModalProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const handleModalOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setName("");
    setOpen(false);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onCreate = () => {
    if (!name) {
      toast.error('New Room name is required');
      return
    };

    createRoom(name);
    setOpen(false);
  };

  return (
    <main>
      <Button onClick={handleModalOpen} className={styles.createBtn}>
        Create Room
      </Button>
      <Modal open={open} onClose={handleClose} className={styles.wraper}>
        <Box className={styles.continer}>
          <TextField
            label="Room Name"
            value={name}
            variant="outlined"
            fullWidth
            onChange={handleNameChange}
            style={{
              width: "60%",
            }}
            className={styles.inputField}
          />
          <Button variant="contained" color="primary" onClick={onCreate}>
            Create
          </Button>
        </Box>
      </Modal>
    </main>
  );
}
