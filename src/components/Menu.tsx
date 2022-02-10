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
      <ul className="menu p-0 hover:p-4 overflow-y-auto w-12 hover:w-72 bg-base-100 text-base-content">
        {links.map((link) => {
          return (
            <li key={keyGen()}>
              <Link href={link.url} passHref>
                <a>
                  <span className="text-xl mr-2">{link.icon}</span>
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
