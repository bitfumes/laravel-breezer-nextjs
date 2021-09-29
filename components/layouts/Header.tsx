import type { NextPage } from "next";
import Link from "next/link";
import { useAppStore } from "store/app";
import useLoginUser from "utility/models/useLoginUser";
import React, { useEffect } from "react";

const Header: NextPage = () => {
  const { logout, checkLogin } = useLoginUser();
  const { isLoggedIn } = useAppStore();

  useEffect(() => checkLogin(), []);

  return (
    <nav className="w-full px-4 py-4 bg-blue-600 text-white flex justify-between">
      <div>
        <Link href="/">
          <a className="mx-2">Home</a>
        </Link>
      </div>
      <div>
        {isLoggedIn && (
          <Link href="/profile">
            <a className="mx-2">Profile</a>
          </Link>
        )}

        {!isLoggedIn && (
          <Link href="/login">
            <a className="mx-2">Login</a>
          </Link>
        )}
        {!isLoggedIn && (
          <Link href="/register">
            <a className="mx-2">Register</a>
          </Link>
        )}

        {isLoggedIn && (
          <a className="mx-2 cursor-pointer" onClick={logout}>
            Logout
          </a>
        )}
      </div>
    </nav>
  );
};

export default Header;
