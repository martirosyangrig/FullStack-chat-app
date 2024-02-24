import { Avatar, Box, Button, Input, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../helpers/baseUrl";

import styles from "./signin.module.scss";

export default function SignIn() {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const maxSizeInBytes = 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!imagePreview || !username) return;

    const { data } = await axios.post(`${baseUrl}users`, {
      name: username,
      img: imagePreview,
    });
    sessionStorage.setItem("user", JSON.stringify(data));
    navigate("/chatRooms");
  };

  return (
    <Box className={styles.wraper}>
      <Box className={styles.continer}>
        <Box className={styles.main}>
          <Input
            type="file"
            onChange={handleFileChange}
            inputProps={{ accept: "image/*" }}
            style={{ display: "none" }}
            id="image-input"
          />
          <Avatar
            alt="User Avatar"
            src={imagePreview || "default_image_url"}
            sx={{
              width: 100,
              height: 100,
              margin: "10px auto",
              display: "block",
            }}
          />
          <label htmlFor="image-input" className={styles.chooseImg}>
            <Button
              component="span"
              variant="contained"
              color="primary"
              style={{ width: "100%", marginBottom: "10px" }}
            >
              Choose Image
            </Button>
          </label>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "50%",
            }}
          />
          <Button onClick={handleSave} className={styles.save}>
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
