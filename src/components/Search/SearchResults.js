import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";

import { MdSupervisorAccount, MdImageSearch } from "react-icons/md";

import Nav from "../Nav";
import SearchBar from "../SearchBar";
import { Posts, emojiMap, backgrounds, ExplorePost } from "../Exports";
import defaultUser from "../../assets/sample_dp.jpg";

function SearchResults(props) {
  const [accountsSection, setAccountsSection] = useState(true || false);

  const { searchtext } = useParams(); //This variable has the search text

  var username = "scja";

  return (
    <>
      <Nav />
      <div className="flex w-screen justify-center sticky top-0 bg-white shadow-lg ml-0 z-10 rounded-b-lg">
        <SearchBar />
      </div>
      <div className="flex items-center z-0 justify-center">
        <div className="flex flex-col bg-white shadow-md p-6 md:w-[50vw] md:min-h-[90vh] md:max-h-[90vh] overflow-y-auto rounded-b-xl">
          <div
            className="flex justify-evenly items-center"
            onClick={() => {
              setAccountsSection(!accountsSection);
            }}
          >
            <div
              className={`flex justify-center w-full cursor-pointer ${
                accountsSection ? "border-b-accent border-b-2" : ""
              }`}
            >
              <MdSupervisorAccount
                size={30}
                className={`${
                  !accountsSection ? "text-gray-600" : "text-black"
                }`}
              />
            </div>
            <div
              className={`flex justify-center w-full cursor-pointer ${
                !accountsSection ? "border-b-accent border-b-2" : ""
              }`}
              onClick={() => {
                setAccountsSection(!accountsSection);
              }}
            >
              <MdImageSearch
                size={30}
                className={`${
                  accountsSection ? "text-gray-600" : "text-black"
                }`}
              />
            </div>
          </div>
          {accountsSection ? (
            <section className="accounts flex flex-col items-center mt-4 ml-2 mr-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={defaultUser}
                    alt={username}
                    style={{
                      width: "12%",
                      height: "12%",
                      objectFit: "cover",
                    }}
                    className="rounded-full"
                  />{" "}
                  <Link
                    to={`/user/username`}
                    className="text-md font-semibold font-otherNames flex"
                  >
                    &nbsp;@{username}{" "}
                    <span className="font-emoji">
                      {emojiMap[username[0].toUpperCase()]}
                    </span>
                  </Link>
                </div>
                <button className="border-1 border-primary  text-primary text-sm p-1 pl-2 pr-2 rounded-lg hover:text-white hover:bg-text hover:border-0">
                  Follow
                </button>
              </div>
              <span className="w-full border-t-1 border-gray-300 mt-2 mb-2"></span>
              {/** */}
              <p className="text-xl font-bold text-gray-600">
                We're out of results :/
              </p>
              <Link
                to={"/"}
                className="font-logo text-transparent bg-clip-text bg-gradient-to-r from-primary to-text text-md m-4"
              >
                PinFluence
              </Link>
            </section>
          ) : (
            <section className="posts flex flex-col justify-center mt-4 ml-2 mr-2">
              <div className="posts grid md:grid-cols-3">
                {/***
                 *
                 * Get username of the user who posted the picture because it uses the username and post id to navigate
                 * /post/user/sjakj
                 *\/post *This is the path*\/user *This is the username*\/sjakj *This is the post id*
                 *
                 */}
                <Link to={"/post/user/sjakj"}>
                  <ExplorePost
                    dp="https://i.pinimg.com/474x/b2/19/c5/b219c5c5ac8f06624df562ce942509c9.jpg"
                    image="https://wallpaperaccess.com/full/1096323.jpg"
                    username="black_ox"
                    caption="Good things take time!"
                  />
                </Link>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

SearchResults.propTypes = {};

export default SearchResults;
