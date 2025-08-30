import { NavLink } from "react-router-dom";

const SidebarLinks = ({ links, onLinkClick }) => {
  return (
    <nav>
      <ul className="space-y-2">
        {links.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              onClick={() => {
                if (onLinkClick) onLinkClick();
              }}
              className={({ isActive }) =>
                `flex gap-1 items-center py-2 text-gray-600 hover:bg-gray-100 rounded transition ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarLinks;
