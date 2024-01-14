import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="container md:w-2/5 w-screen top-0 bg-white ml-8 m-1">
      <div className="flex items-center justify-evenly">
        <div>
          <Link
            to={"/"}
            className="font-logo text-transparent bg-clip-text bg-gradient-to-r from-primary to-text text-xl"
          >
            PinFluence
          </Link>
        </div>
        &nbsp;
        <div className="flex justify-between items-center w-11/12">
          <form
            action={`/search/${searchText}`}
            method="get"
            className="flex justify-around items-center w-11/12"
          >
            <input
              type="text"
              name=""
              id=""
              className="rounded-3xl border-2 p-2 border-gray-300 hover:border-primary focus:outline-none focus:border-primary transition-all ease-out duration-300 w-full"
              placeholder="Search accounts, posts..."
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <button
              type="submit"
              name="search"
              value={true}
              className="mr-3 ml-3 rounded-3xl border-2 p-2 border-primary text-primary hover:border-0 hover:bg-gradient-to-tr from-primary to-text hover:text-white transition-all ease-in-out duration-100"
            >
              <div className="flex items-center justify-center">
                <AiOutlineSearch size={20} />
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
