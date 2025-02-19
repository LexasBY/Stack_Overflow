import "./menu.css";
import { NavLink } from "react-router";

const menuItems = [
  { path: "/", label: "Home", icon: "🏠" },
  { path: "/account", label: "My Account", icon: "👤" },
  { path: "/new-snippet", label: "Post Snippet", icon: "📝" },
  { path: "/my-snippets", label: "My Snippets", icon: "📂" },
  { path: "/questions", label: "Questions", icon: "❓" },
  { path: "/units", label: "Units", icon: "⚙️" },
];

const Menu = () => {
  return (
    <nav className="menu">
      <ul className="menu__list">
        {menuItems.map(({ path, label, icon }) => (
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
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
