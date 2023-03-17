import { Button, TextareaAutosize } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { LoginModal } from "./components/loginModal/loginModal";
import { FetchService, LoginData } from "./services/fetchService";
import xmlFormat from "xml-formatter";

function App() {
  const [login, setLogin] = useState<LoginData>();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);
  const [fetchService, setFetchService] = useState<FetchService>();
  const [fetch, setFetch] = useState("");
  const [result, setResult] = useState("");

  const onSendCallback = useCallback(async () => {
    if (fetchService && fetch) {
      const response = await fetchService.executeFetch(fetch);
      const body = await response.text();
      if (body) {
        try {
          setFetch(xmlFormat(fetch));
          setResult(xmlFormat(body));
        } catch {
          setResult(body);
        }
      }
    }
  }, [fetchService, fetch]);

  useEffect(() => {
    if (login) {
      setFetchService(new FetchService(login));
    }
  }, [login]);

  return (
    <div className="App">
      <LoginModal
        onClose={(loginData) => {
          setLogin(loginData);
          setIsLoginModalOpen(false);
        }}
        open={isLoginModalOpen}
      />
      <TextareaAutosize
        placeholder="Paste your fetchXml"
        value={fetch}
        onChange={(e) => {
          setFetch(e.target.value);
        }}
        minRows={10}
        style={{ resize: "none", width: "80%", marginTop: "10px" }}
      />
      <TextareaAutosize
        value={result}
        readOnly
        minRows={10}
        style={{ resize: "none", width: "80%", marginTop: "10px" }}
      />
      <Button onClick={onSendCallback}>Send!</Button>
    </div>
  );
}

export default App;
