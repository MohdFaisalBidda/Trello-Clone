"use client";

import Image from "next/image";
import React from "react";
import trello from "@/public/trello.png";
import Avatar from "@/app/components/Avatar";
import {BiSearch} from "react-icons/bi"

function Navbar() {
  return (
    <header className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
     <div className="absolute w-full h-96 top-0 left-0 bg-gradient-to-br from-violet-500 to-blue-500 filter opacity-50 blur-3xl -z-10" />
      <div className="flex items-center gap-2">
        <Image src={trello} alt="trelloIcon" />
        <h1 className="text-3xl font-extrabold">Trello</h1>
      </div>
      <div className="flex items-center space-x-5 flex-1 justify-end w-full">
        <form className="flex items-center space-x-3 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <BiSearch className="h-6 w-6 text-gray-500"/>
            <input
            type="text"
            className="flex-1 outline-none p-2"
            placeholder="Search"
            />
            <button type="submit" hidden>
                Search
            </button>
        </form>
        <Avatar />
      </div>
    </header>
  );
}

export default Navbar;
