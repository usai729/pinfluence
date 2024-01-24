import { Search } from "@mui/icons-material";
import { Input } from "@mui/joy";
import React from "react";
import { Link } from "react-router-dom";
import List from "./List";

export default function ChatList() {
  return (
    <div>
      <div className="w-[20em] h-full p-3 flex flex-col bg-white border-r-1 border-gray-300">
        <div className="flex w-full mb-5 items-center justify-center">
          <Link
            to={"/"}
            className="font-logo text-transparent bg-clip-text bg-gradient-to-r from-primary to-text text-2xl"
          >
            PinFluence
          </Link>
        </div>
        <div className=" mb-3 flex justify-center items-center">
          <Input
            placeholder="Search..."
            startDecorator={<Search />}
            className="w-full"
          />
        </div>
        <List />
      </div>
    </div>
  );
}
