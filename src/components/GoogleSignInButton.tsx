import React from "react";
import { FcGoogle } from "react-icons/fc";

function GoogleSignInButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="btn flex h-fit w-fit justify-center gap-4 bg-gray-200 py-2 hover:bg-white sm:w-full"
      onClick={() => onClick()}
    >
      <FcGoogle className="text-3xl" />
      <span className="text-black">Sign-in with Google</span>
    </button>
  );
}

export default GoogleSignInButton;
