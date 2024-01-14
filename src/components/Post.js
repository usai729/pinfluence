import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Resizer from "react-image-file-resizer";

import defaultUser from "../assets/user.jpg";
import sample1 from "../assets/sample_post.jpg";
import sample2 from "../assets/sample_post2.jpeg";
import sample3 from "../assets/samplepost_sq.webp";

import { BsThreeDots } from "react-icons/bs";
import { BiSolidDownload } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";

import SearchBar from "./SearchBar";
import Nav from "./Nav";

export default function Post(props) {
  const [showOptions, setShowOptions] = useState(false);

  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate(-1);
  });

  var { username, postid } = useParams();

  if (props.myprofile) {
    username = "username";
    postid = 0;
  }

  return (
    <>
      {props.fromHome ? <Nav /> : ""}
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col md:flex-row justify-center items-center bg-white w-max shadow-md rounded-lg md:p-3">
          {props.fromHome ? (
            <IoIosArrowBack
              size={30}
              onClick={goBack}
              style={{
                cursor: "pointer",
              }}
            />
          ) : (
            ""
          )}
          <img
            src={sample1}
            alt=""
            style={{
              width: "30rem",
            }}
          />
          <div className="flex flex-col md:ml-2 max-w-sm max-h-[80vh] min-h-[80vh] overflow-y-auto border-l-2 border-gray-300 p-2 ">
            <div>
              <div className="flex justify-between items-center max-w-sm">
                <div className="flex items-center">
                  <img
                    src={defaultUser}
                    className="rounded-full"
                    style={{
                      width: "10%",
                      height: "10%",
                    }}
                    alt=""
                  />
                  <p className="text-sm font-bold">@{"username"}</p>
                </div>
                <div className="flex items-center">
                  <BsThreeDots
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setShowOptions(!showOptions);
                      setTimeout(() => {
                        setShowOptions((prev) => !prev);
                      }, 3000);
                    }}
                  />
                  <div
                    className={`flex flex-col absolute bg-white p-2 shadow-md mt-24 rounded-md ${
                      showOptions ? "visible" : "invisible"
                    }`}
                    style={{
                      opacity: showOptions ? 1 : 0,
                      transition: "opacity 0.5s ease",
                    }}
                  >
                    <ul>
                      <li>
                        <Link>Report</Link>
                      </li>
                      {props.myprofile ? (
                        <li>
                          <form action="">
                            <input type="hidden" />
                            <button type="submit">Delete Post</button>
                          </form>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <p className="text-sm">
                Caption. Vestibulum suscipit lectus in odio vehicula viverra.
                Nam at orci quam. Nunc sed sapien dignissim, cursus eros sed,
                faucibus nisl. Nullam nec pretium mauris. Aliquam ac porta
                dolor. Donec vestibulum eget augue sed iaculis. Vivamus cursus
                ante nisi.
              </p>
            </div>
            <span className="border-t-2 border-gray-300 mt-2 mb-2"></span>
            <div className="comments flex flex-col">
              <div className="">
                <form action="" className="flex">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full p-2 focus:outline-none"
                  />
                  <button type="submit">Add</button>
                </form>
              </div>
            </div>
            {/* 
              COMMENTS
            */}
            <div className="flex flex-col items-center mb-2">
              <div className="flex items-center mb-2">
                <img
                  src={defaultUser}
                  className="rounded-full"
                  style={{
                    width: "7%",
                  }}
                  alt=""
                />
                <Link className="text-sm font-bold">@{username}</Link>
              </div>
              <p className="text-xs">
                Aliquam ac porta dolor. Donec vestibulum eget augue sed iaculis.
                Vivamus cursus ante nisi.
              </p>
              {/** */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
