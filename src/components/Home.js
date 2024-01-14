import React, { useEffect, useState } from "react";

import Nav from "./Nav";
import HomeRightTop from "./HomeRightSection/HomeRightTop";
import HomeSearchAndContent from "./HomeCenterSection/HomeSearchAndContent";

import { DarkThemeBtn, LogoutBtn } from "./Exports";

export default function Home() {
  const [screenSize, setScreenSize] = useState("large");

  useEffect(() => {
    if (window.innerWidth > 775) {
      setScreenSize("large");
    } else {
      setScreenSize("small");
    }

    document.title = "PinFluence - Home";
  }, [window.innerWidth]);

  // const right = (
  //   <div className="flex-col h-3/5 p-3 border-2 border-gray-300 w-3/5">
  //     <HomeRightTop />
  //     <HomeRightTop />
  //     <HomeRightTop />
  //     <HomeRightTop />
  //     <HomeRightTop />
  //     <HomeRightTop />
  //     <HomeRightTop />
  //     <HomeRightTop />
  //     <HomeRightTop />
  //   </div>
  // );

  return (
    <>
      <Nav />
      <div className="flex justify-center items-center w-full">
        <HomeSearchAndContent />
        <div className="bottom-5 right-5 fixed">
          <LogoutBtn />
        </div>
      </div>
    </>
  );
}
