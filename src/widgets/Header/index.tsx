import "./header.css";
import { Link } from "react-router"; // Используйте react-router-dom!
import { Button } from "@mui/material";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useLogout } from "../../hooks/useLogout";

const Header = () => {
  const { data: user, isLoading } = useCurrentUser();
  const logoutMutation = useLogout();
  const isLogoutLoading = logoutMutation.status === "pending";

  if (isLoading) {
    return (
      <header className="header">
        <div className="container header__container">
          <p>Loading...</p>
        </div>
      </header>
    );
  }

  const buttonSx = {
    backgroundColor: "white",
    color: "darkblue",
    "&:hover": {
      backgroundColor: "rgba(129, 178, 245, 0.76)",
      color: "white",
    },
    "&:active": { backgroundColor: "rgb(2, 2, 45)" },
    "&:focusVisible": {
      outline: "3px solid darkblue",
      backgroundColor: "rgba(129, 178, 245, 0.76)",
      color: "white",
    },
  };

  return (
    <header className="header">
      <div className="container header__container">
        <Link to="/" className="header__left">
          <div className="header__svg">{"</>"}</div>
          <h2 className="name header__name">CODELANG</h2>
        </Link>

        <div className="header__right">
          {user ? (
            <Button
              variant="contained"
              onClick={() => logoutMutation.mutate()}
              sx={buttonSx}
              disabled={isLogoutLoading}
            >
              {isLogoutLoading ? "..." : "SIGN OUT"}
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="contained" sx={buttonSx}>
                SIGN IN
              </Button>
            </Link>
          )}
          <div className="language">
            <div className="language__svg">🌍</div>
            <span className="name language__name">EN</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
