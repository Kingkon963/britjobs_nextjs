import Link from "next/link";
import * as React from "react";

const Header: React.FC = () => {
  return (
    <div className="flex py-3 items-center border-b border-base-100">
      <div>
        <h1 className="text-4xl tracking-wider">Britjobs</h1>
      </div>
      <div className="flex gap-2 ml-auto">
        <Link href="/login" passHref>
          <button className="btn btn-primary">Login</button>
        </Link>
        <Link href="/register" passHref>
          <button className="btn">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
