import React from "react";
import { FcGoogle } from "react-icons/fc";

function GoogleSignInButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="btn flex justify-center gap-4 bg-gray-200 hover:bg-white"
      onClick={() => onClick()}
    >
      <FcGoogle className="text-3xl" />
      <span className="text-black">Sign-in with Google</span>
    </button>
  );
}

export default GoogleSignInButton;
