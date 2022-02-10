import keyGen from "@utils/genKey";
import Link from "next/link";
import * as React from "react";
import { MdLabel } from "react-icons/md";

const links = [
  {
    label: "Dashboard",
    url: "/dashboard",
  },
  {
    label: "Jobs",
    url: "#",
  },
];

const Menu: React.FC = () => {
  return (
    <>
      <ul className="menu p-4 overflow-y-auto w-72 bg-base-100 text-base-content">
        {links.map((link) => {
          return (
            <li key={keyGen()}>
              <Link href={link.url}>{link.label}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Menu;
