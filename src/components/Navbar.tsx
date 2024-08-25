import React from "react";
import { IoTerminalOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const user = auth();
  console.log(user);
  return (
    <div className="flex w-full justify-between py-4 px-8  bg-[#0C0C0D]  ">
      <div className="flex justify-center items-center gap-2">
        <IoTerminalOutline className="text-3xl text-white" />
        <h1 className="text-3xl text-white">Blip</h1>
      </div>
      <div className="flex justify-center items-center gap-5">
        <Link href="/create">
          <Button className="dark"> Create </Button>
        </Link>
        {user.userId ? (
          <UserButton />
        ) : (
          <Link href="/sign-in">
            <FaUserCircle className="text-3xl text-white" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
