import React from "react";
import { Link } from "react-router-dom";

import defaultUser from "../../assets/user.jpg";
import samplePost from "../../assets/sample_post.jpg";
import samplePost2 from "../../assets/sample_post2.jpeg";
import scroller from "../../assets/css/scroller.css";

export default function HomeRightTop() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={defaultUser}
            alt=""
            className="rounded-full"
            style={{
              width: "30%",
            }}
          />
          <Link className="font-bold">&nbsp;@username</Link>
        </div>
        <button className="bg-transparent border-2 border-slate-950 pr-2 pl-2 pt-0 pb-0 rounded-full">
          Follow
        </button>
      </div>
      <div className="grid grid-cols-3 mt-2">
        <img src={samplePost} alt="" style={styles.topPostsStyle} />
        <img src={samplePost2} alt="" style={styles.topPostsStyle} />
        <img src={samplePost} alt="" style={styles.topPostsStyle} />
      </div>
    </>
  );
}

const styles = {
  topPostsStyle: {
    width: "150px",
    height: "150px",
  },
};
