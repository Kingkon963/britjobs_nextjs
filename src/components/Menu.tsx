import keyGen from "@utils/genKey";
import Link from "next/link";
import * as React from "react";
import { MdDashboard, MdWork } from "react-icons/md";

const links = [
  {
    label: "Dashboard",
    icon: <MdDashboard />,
    url: "/dashboard",
  },
  {
    label: "Jobs",
    icon: <MdWork />,
    url: "#",
  },
];

const Menu: React.FC = () => {
  return (
    <>
      <ul className="menu overflow-y-auto bg-base-100  p-0 text-base-content">
        {links.map((link) => {
          return (
            <li key={keyGen()}>
              <Link href={link.url} passHref>
                <a>
                  <span className="mr-2 text-xl">{link.icon}</span>
                  {link.label}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Menu;
