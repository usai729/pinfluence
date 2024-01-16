import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Resizer from "react-image-file-resizer";

import defaultUser from "../../assets/user.jpg";

import { BsThreeDots } from "react-icons/bs";
import { BiSolidDownload } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoIosBrowsers } from "react-icons/io";

export default function HomeContent(props) {
  const [showOptions, setShowOptions] = useState(false);

  var username = "user1";

  return (
    <>
      <div
        className="flex flex-col border-gray-200 border-2 rounded-xl m-0 mt-2 md:m-2 pt-2 pb-2 w-screen md:w-5/12 md:min-w5/12 shadow-xl bg-white "
        style={{
          gap: "0",
        }}
      >
        <div className="flex justify-between mr-4 ml-4 mb-2">
          <div className="flex items-center">
            <img
              src={defaultUser}
              alt={username}
              width={"40rem"}
              height={"40rem"}
              className="rounded-full"
            />
            <Link>&nbsp;{username}</Link>
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
                <li>
                  <Link>Unfollow</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="">
          <img
            src={props.image}
            alt=""
            width="100%"
            style={{ display: "block" }}
            onDoubleClick={() => {
              console.log("Like");
            }}
          />
        </div>
        <div className="flex justify-between items-center mr-2 ml-2 mt-2">
          <div className="flex items-center justify-center text-center">
            <AiOutlineHeart
              size={25}
              style={{
                cursor: "pointer",
              }}
            />
            <p className="text-sm">&nbsp;0 likes</p>
          </div>
          <div className="flex">
            <BiSolidDownload
              size={20}
              style={{
                cursor: "pointer",
              }}
            />{" "}
            &nbsp;
            <Link to={"/post/user/281987"} className="sm:invisible md:visible">
              <IoIosBrowsers
                size={20}
                style={{
                  cursor: "pointer",
                }}
                className="sm:invisible md:visible"
              />
            </Link>
          </div>
        </div>
        <div className="block mr-3 ml-3 mt-2 mb-1">
          <p className="text-xs text-gray-600 font-para">XX-XX-XXXX</p>
          <p className="text-sm font-para">
            Vestibulum suscipit lectus in odio vehicula viverra. Nam at orci
            quam. Nunc sed sapien dignissim, cursus eros sed, faucibus nisl.
            Nullam nec pretium mauris. Aliquam ac porta dolor. Donec vestibulum
            eget augue sed iaculis. Vivamus cursus ante nisi.
          </p>
        </div>
        <div className="border-t-2 border-gray-300 mt-1"></div>
        <div className="mr-3 ml-3 mt-2 mb-1 block">
          <p className="text-sm text-gray-600">{0} comments</p>
          <div className="flex">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full outline-none text-xs"
            />
            <button className="text-xs">Post</button>
          </div>
        </div>
      </div>
    </>
  );
  // return (
  //   <>
  //     <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-lg max-w-[15rem]">
  //       <div className="flex justify-between items-center">
  //         <div className="flex items-center gap-1">
  //           <img
  //             src="https://i.pinimg.com/736x/df/28/20/df28204b9402262a73bf36bd77fb6b7f.jpg"
  //             className="rounded-full"
  //             style={{
  //               objectFit: "contain",
  //               width: "2rem",
  //               height: "2rem",
  //             }}
  //             alt=""
  //           />
  //           <p className="text-sm">{username}</p>
  //         </div>
  //         <div className="flex items-center">
  //           <BsThreeDots
  //             style={{
  //               cursor: "pointer",
  //             }}
  //             onClick={() => {
  //               setShowOptions(!showOptions);
  //               setTimeout(() => {
  //                 setShowOptions((prev) => !prev);
  //               }, 3000);
  //             }}
  //           />
  //           <div
  //             className={`flex flex-col absolute bg-white p-2 shadow-md mt-24 rounded-md ${
  //               showOptions ? "visible" : "invisible"
  //             }`}
  //             style={{
  //               opacity: showOptions ? 1 : 0,
  //               transition: "opacity 0.5s ease",
  //             }}
  //           >
  //             <ul>
  //               <li>
  //                 <Link>Report</Link>
  //               </li>
  //               <li>
  //                 <Link>Unfollow</Link>
  //               </li>
  //             </ul>
  //           </div>
  //         </div>
  //       </div>
  //       <img
  //         src={props.image}
  //         className="rounded-lg"
  //         style={{
  //           maxWidth: "16rem",
  //         }}
  //         alt=""
  //       />
  //       <p className="text-md">
  //         Vestibulum suscipit lectus in odio vehicula viverra. Nam at orci //
  //         quam.
  //       </p>
  //     </div>
  //   </>
  // );
}
