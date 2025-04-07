import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./tokenModal.scss";
import { TokenAPI } from "../../api/token/token.api";
function TokenModal({ show, setShow }) {
  const [theme, setTheme] = useState("light");
  const [token, setToken] = useState("");

  const tokenApi = new TokenAPI();
  useEffect(() => {
    if (show) {
      const storedTheme = localStorage.getItem("theme") || "light";
      setTheme(storedTheme);
      console.log("Theme fetched:", storedTheme);
    }
  }, [show]); // Runs only when `show` changes

  const handleSubmit = async () => {
    if (token.startsWith("http://") || token.startsWith("https://")) {
      await tokenApi.generateToken(token);
      setShow(false);
    } else {
      alert("Token must start with http:// or https://");
    }
  };
  

  
  const handleClose = async () => {
    setShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
       className={theme === "dark" ? "dark-theme" : "light-theme"}
       data-bs-theme={theme}
    >
      <Modal.Header closeButton>
        <div className="modal-title">Add new Token</div>
      </Modal.Header>
      <Modal.Body>
          <div className="token-form-group" controlId="exampleForm.ControlInput1">
            <label >Portfolio URL</label>
            <input type="url" required placeholder="www.portfolio.com" autoFocus value={token} onChange={(e)=> setToken(e.target.value)} />
          </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TokenModal;
