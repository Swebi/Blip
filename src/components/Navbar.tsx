import React from "react";
import { IoTerminalOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";

const Navbar = async () => {
  const user = await checkUser();

  return (
    <div className="flex w-[85%] mx-auto  rounded-full justify-between py-4 px-8 mt-6  bg-[#0C0C0D]  ">
      <Link href="/">
        <div className="flex justify-center items-center gap-2">
          <IoTerminalOutline className="text-3xl text-white" />
          <h1 className="text-3xl text-white">Blip</h1>
        </div>
      </Link>

      <div className="flex justify-center items-center gap-5">
        {user ? (
          <UserButton />
        ) : (
          <Link href="/sign-in" className="h-5 w-5">
            <FaUser className="text-2xl text-white" />
          </Link>
        )}
        <Link href="/create">
          <Button className="dark"> Create </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
