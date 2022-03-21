import Link from "next/link";
import * as React from "react";
import { AuthContext, AUTH_ACTIONS } from "src/contexts/AuthContext";
import defaultProfilePic from "src/assets/svg/defaultProfilePic";

const Header: React.FC = () => {
  const { state: AuthState, dispatch } = React.useContext(AuthContext);

  const handleLogout = () => {
    if (dispatch) {
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };

  return (
    <div className="border-base-100 flex items-center border-b py-3">
      <div>
        <h1 className="text-4xl tracking-wider">Britjobs</h1>
      </div>
      <div className="ml-auto flex gap-2">
        {!AuthState.isLogedin && (
          <>
            <Link href="/auth/login" passHref>
              <button className="btn btn-primary">Login</button>
            </Link>
            <Link href="/auth/register" passHref>
              <button className="btn">Register</button>
            </Link>
          </>
        )}
        {AuthState.isLogedin && (
          <>
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-circle bg-base-100 p-0">
                {defaultProfilePic}
              </button>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-300 rounded-box w-52 p-2 shadow"
              >
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
                <li>
                  <a onClick={() => handleLogout()}>Logout</a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
