import { NavLink } from "react-router-dom";
import "./style.scss";
import { ROUTES } from "../../platform/routes";

function Sidebar() {
  return (
    <div className="P-sidebar">
      <NavLink
        className={({ isActive }) => (isActive ? "active" : "")}
        to={ROUTES.USERS}>Users</NavLink>

    </div>
    );
}

export default Sidebar;
