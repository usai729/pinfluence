import React, { useEffect, useState } from "react";

import Nav from "../Nav";
import SearchBar from "../SearchBar";
import { LogoutBtn, Posts } from "../Exports";

import { FiShare2 } from "react-icons/fi";

import DefaultUser from "../../assets/user.jpg";
import sampledp from "../../assets/sample_dp.jpg";

import IMG1 from "../../assets/backgrounds/1.jpg";
import IMG2 from "../../assets/backgrounds/2.jpg";
import IMG3 from "../../assets/backgrounds/3.jpg";
import IMG4 from "../../assets/backgrounds/4.jpg";

export default function UserProfile() {
  const [sort, setSort] = useState("date");

  var username = "user";

  useEffect(() => {
    document.title = `PinFluence - ${username}`;
  });

  return (
    <>
      <Nav />
      <div className="flex w-screen justify-center fixed top-0 bg-white shadow-lg ml-0 md:ml-16 z-10">
        <SearchBar />
      </div>
      <div className="flex flex-col justify-content items-center overflow-x-hidden transition-all duration-500 ease-in-out mt-4">
        <div className="flex flex-col justify-content items-center mb-20 md:mb-0 rounded-br-xl rounded-bl-xl shadow-lg md:pr-4 md:pl-4 pb-4 z-0 bg-white">
          <div className="flex flex-col items-center mt-16 ">
            <img
              src={DefaultUser}
              alt=""
              className="rounded-full"
              style={{
                width: "15rem",
                height: "15rem",
                objectFit: "cover",
              }}
            />
            <p className="text-2xl font-name font-bold">{username}</p>
            <div className="flex justify-between w-2/3">
              <p className="font-bold text-center">
                0 <br /> followers
              </p>
              <p className="font-bold text-center">
                0 <br /> following
              </p>
            </div>
            <div className="flex justify-between w-full">
              <button className="text-center bg-text hover:bg-btnHover text-white rounded-sm p-2 m-2 w-full">
                Follow
              </button>
              <button className="text-center text-primary border-primary border-2 rounded-sm p-2 m-2 w-full flex items-center justify-center hover:text-white hover:bg-primary">
                <FiShare2
                  style={{
                    marginLeft: "0.4rem",
                  }}
                />
              </button>
            </div>
          </div>
          <div className="flex items-right">
            <select
              name="sort"
              id=""
              onChange={(event) => {
                setSort(event.target.value);
              }}
              style={{
                background: "transparent",
                padding: "0.6rem",
                outline: "none",
              }}
            >
              <option value="" selected disabled>
                Sort by
              </option>
              <optgroup>
                <option value="date">Upload date (default)</option>
                <option value="likes">Likes</option>
              </optgroup>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            <Posts image={IMG1} id="326421332" explore={true} disable={true} />
            <Posts image={IMG2} id="219739867" explore={true} disable={true} />
            <Posts image={IMG3} id="382617218" explore={true} disable={true} />
            <Posts image={IMG4} id="988671266" explore={true} disable={true} />
          </div>
          <div className="bottom-5 right-5 fixed">
            <LogoutBtn />
          </div>
        </div>
      </div>
    </>
  );
}
