import "./menu.css";
import { NavLink } from "react-router";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const menuItems = [
  { path: "/", label: "Home", icon: "🏠" },
  { path: "/me", label: "My Account", icon: "👤" },
  { path: "/snippet/new", label: "Post Snippet", icon: "📝" },
  { path: "/snippets/me", label: "My Snippets", icon: "📂" },
  { path: "/questions", label: "Questions", icon: "❓" },
  { path: "/users", label: "Users", icon: "👥" },
];

const Menu = () => {
  const { data: user, isLoading } = useCurrentUser();

  return (
    <nav className="menu">
      <ul className="menu__list">
        {menuItems.map(({ path, label, icon }) => {
          if (path === "/me" && (isLoading || !user)) {
            return null;
          }

          return (
            <li key={path} className="menu__item">
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive ? "menu__link menu__link--active" : "menu__link"
                }
              >
                <span className="menu__icon">{icon}</span>
                {label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
