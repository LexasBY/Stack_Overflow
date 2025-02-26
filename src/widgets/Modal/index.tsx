// src/widgets/Modal.tsx
import { FC } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router";
import Login from "../../features/auth/Login";
import Register from "../../features/auth/Register";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./modal.css";

const Modal: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "backdrop") {
      navigate("/");
    }
  };

  return createPortal(
    <div id="backdrop" className="backdrop" onClick={handleClose}>
      <div className="modal-wrapper">
        <IconButton className="close-btn" onClick={() => navigate("/")}>
          <CloseIcon className="close-modal-svg" />
        </IconButton>
        <div className="modal-content">
          {location.pathname === "/register" ? <Register /> : <Login />}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
