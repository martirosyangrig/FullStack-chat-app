import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";

import styles from "./modal.module.scss";

interface INewRoomModal {
  createRoom: (roomName: string) => void;
}

export default function NewRoomModal({ createRoom }: INewRoomModal) {
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
    setName(e.target.value.trim());
  };

  const onCreate = () => {
    if (!name) return;
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