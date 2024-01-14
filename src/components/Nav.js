import React from "react";

import {
  AiOutlineHome,
  AiFillHome,
  AiOutlinePlus,
  AiOutlineLogout,
} from "react-icons/ai";
import { MdOutlineExplore, MdExplore } from "react-icons/md";
import { RiAccountCircleLine, RiAccountCircleFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  var location = useLocation();

  return (
    <div className="container flex-col w-screen border-t-2 border-black md:border-none bg-white fixed left-0 right-0 bottom-0 md:w-max md:h-screen md:bg-gradient-to-tr from-primary via-70% to-text z-50 md:shadow-md">
      <ul className="flex justify-evenly items-center md:flex-col">
        <li>
          <div className="flex">
            <Link to={"/"}>
              {location.pathname !== "/" ? (
                <AiOutlineHome
                  size={40}
                  className="m-3 p-2 rounded-3xl md:md:bg-white md:text-primary cursor-pointer transition-all ease-in-out duration-500 hover:rounded-md"
                />
              ) : (
                <AiFillHome
                  size={40}
                  className="m-3 p-2 rounded-3xl md:md:bg-white md:text-primary cursor-pointer transition-all ease-in-out duration-500 hover:rounded-md"
                />
              )}
            </Link>
          </div>
        </li>
        <li>
          <div className="flex">
            <Link to="/explore">
              {location.pathname !== "/explore" ? (
                <MdOutlineExplore
                  size={40}
                  className="m-3 p-2 rounded-3xl md:bg-white md:text-primary cursor-pointer transition-all ease-in-out duration-500 hover:rounded-md"
                />
              ) : (
                <MdExplore
                  size={40}
                  className="m-3 p-2 rounded-3xl md:bg-white md:text-primary cursor-pointer transition-all ease-in-out duration-500 hover:rounded-md"
                />
              )}
            </Link>
          </div>
        </li>
        <li>
          <div className="flex">
            <Link to={"/new"}>
              <AiOutlinePlus
                size={40}
                className="m-3 p-2 rounded-3xl md:bg-white md:text-primary cursor-pointer transition-all ease-in-out duration-500 hover:rounded-md"
              />
            </Link>
          </div>
        </li>
        <li>
          <div className="flex">
            <Link to="/myprofile">
              {location.pathname !== "/myprofile" ? (
                <RiAccountCircleLine
                  size={40}
                  className="m-3 p-2 rounded-3xl md:bg-white md:text-primary cursor-pointer transition-all ease-in-out duration-500 hover:rounded-md"
                />
              ) : (
                <RiAccountCircleFill
                  size={40}
                  className="m-3 p-2 rounded-3xl md:bg-white md:text-primary cursor-pointer transition-all ease-in-out duration-500 hover:rounded-md"
                />
              )}
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
}
