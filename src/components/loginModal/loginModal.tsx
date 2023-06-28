import { Button, Modal, Paper, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { LoginData } from "../../services/fetchService";

interface LoginModalProps {
  onClose?: (loginData: LoginData) => void;
  open?: boolean;
}

export const LoginModal = ({ onClose, open }: LoginModalProps) => {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onCloseCallback = useCallback(() => {
    if (url.startsWith("https://")) {
      onClose?.({ email, url, password });
    } else {
      onClose?.({ email, url: "https://" + url, password });
    }
  }, [url, email, password, onClose]);

  return (
    <Modal open={!!open}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Paper
          sx={{
            width: "500px",
            height: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "10px",
          }}
          elevation={3}
        >
          <TextField
            InputLabelProps={{ shrink: true }}
            label="Organization url"
            placeholder="e.g.: https://q.dev.rescocrm.com/"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            label="Email"
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={onCloseCallback}>Save</Button>
        </Paper>
      </div>
    </Modal>
  );
};
