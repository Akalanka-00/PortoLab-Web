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

  const handleClose = async () => {
    await tokenApi.generateToken(token);
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
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="token-modal-url-input">Portfolio URL</Form.Label>
            <Form.Control type="text" placeholder="www.portfolio.com" autoFocus value={token} onChange={(e)=> setToken(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TokenModal;
