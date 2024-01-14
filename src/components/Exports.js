import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import IMG1 from "../assets/backgrounds/1.jpg";
import IMG2 from "../assets/backgrounds/2.jpg";
import IMG3 from "../assets/backgrounds/3.jpg";
import IMG4 from "../assets/backgrounds/4.jpg";
import IMG5 from "../assets/backgrounds/5.jpg";
import IMG6 from "../assets/backgrounds/6.jpg";
import IMG7 from "../assets/backgrounds/7.jpg";
import IMG8 from "../assets/backgrounds/8.jpg";
import IMG9 from "../assets/backgrounds/9.jpg";
import IMG10 from "../assets/backgrounds/10.jpg";
import IMG11 from "../assets/backgrounds/11.jpg";
import IMG12 from "../assets/backgrounds/12.jpg";
import IMG13 from "../assets/backgrounds/13.jpg";
import IMG14 from "../assets/backgrounds/14.jpg";
import IMG15 from "../assets/backgrounds/15.jpg";

import { FiAlertTriangle } from "react-icons/fi";
import { MdDarkMode } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";

import { authInstance, db, storage } from "../firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";

export const emojiMap = {
  A: "🚀",
  B: "🌈",
  C: "🦄",
  D: "🎮",
  E: "🎨",
  F: "🌟",
  G: "🤖",
  H: "🐶",
  I: "🐱",
  J: "🎈",
  K: "🎯",
  L: "🏰",
  M: "🚲",
  N: "🌊",
  O: "🍭",
  P: "🎵",
  Q: "🌺",
  R: "🍔",
  S: "🍕",
  T: "🍦",
  U: "🏀",
  V: "📷",
  W: "📚",
  X: "🎃",
  Y: "🎁",
  Z: "🌄",
  0: "🎉",
  1: "🚗",
  2: "🌻",
  3: "🎻",
  4: "🌠",
  5: "🛸",
  6: "🌳",
  7: "🏖",
  8: "🌞",
  9: "🍩",
  "!": "💫",
  "?": "🌍",
  "#": "🎸",
  "*": "⚽",
  "+": "🎢",
  "-": "🌑",
  "/": "🎤",
  "%": "🚢",
  $: "🌭",
  "&": "🌻",
  _: "📺",
  ".": "🔮",
};

export const backgrounds = [
  IMG1,
  IMG2,
  IMG3,
  IMG4,
  IMG5,
  IMG6,
  IMG7,
  IMG8,
  IMG9,
  IMG10,
  IMG11,
  IMG12,
  IMG13,
  IMG14,
  IMG15,
];

export const Alert = ({ alertContent, bounce, fullscreen, warning }) => {
  return (
    <div
      className={`alert ${warning ? "bg-red-900" : "bg-green-300"} p-2 ${
        bounce ? "animate-bounce" : ""
      } shadow-sm ${warning ? "shadow-red-900" : "shadow-gray-300"} ${
        fullscreen ? "w-screen m-4" : ""
      }`}
      id="alert"
      style={{
        display: "none",
      }}
    >
      <p className="text-white flex justify-between">
        <FiAlertTriangle size={25} />
        {alertContent}
      </p>
    </div>
  );
};

Alert.defaultProps = {
  warning: true,
};

{
  /**for explore only */
}
export const ExplorePost = ({ image, caption, username, dp, id }) => {
  return (
    <>
      <div className="flex flex-col p-2 border-1 border-gray-200 rounded-lg gap-3  w-screen md:w-[15rem] justify-center shadow-sm">
        <div className="flex gap-1 items-center">
          <img
            src={dp}
            alt=""
            className="rounded-full"
            style={{
              objectFit: "contain",
              width: "2.5rem",
              height: "2.5rem",
            }}
          ></img>
          <Link to={username} className="font-semibold text-sm">
            @{username}
          </Link>
        </div>
        <Link to={`/post/${username}/${id}`}>
          <img
            src={image}
            className="rounded-lg w-full md:w-[15rem]"
            style={{
              objectFit: "contain",
            }}
            alt=""
          />
          <p className="text-sm">{caption}</p>
        </Link>
      </div>
    </>
  );
};

export function Posts(props) {
  return (
    <>
      {/*<Link to={`/post/${props.user}/${props.id}`}>*/}
      <img
        src={props.image}
        className={`${
          !props.explore ? "w-80 h-80" : "w-full"
        } m-0 md:w-80 md:h-80 border-2 border-white rounded-md`}
        style={{
          objectFit: "cover",
        }}
        onClick={() => {
          if (!props.disable) {
            props.setShowPost(!props.showPost);
          }
        }}
      />
      {/*</Link>*/}
    </>
  );
}

Posts.defaultProps = {
  user: "user1",
  explore: false,
};

export const DarkThemeBtn = () => {
  return (
    <button className="invisible md:visible right-2 bottom-2 text-black fixed shadow-lg p-4 shadow-slate-800 rounded-full transition-shadow ease-linear duration-200 hover:shadow-xl">
      <MdDarkMode size={30} />
    </button>
  );
};

export function useUpdateDP(uid) {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  async function updateDP() {
    if (!file) {
      return; // Don't proceed if file is not set
    }

    const fileRef = ref(storage, "DPs/" + uid);
    await uploadBytes(fileRef, file);

    const DPURL = await getDownloadURL(fileRef);

    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, { DP: DPURL });

    navigate(0);
  }

  return { setFile, updateDP };
}

export const LogoutBtn = () => {
  const navigate = useNavigate(); // Get the navigation function from React Router

  const handleLogout = () => {
    authInstance
      .signOut()
      .then(() => {
        localStorage.removeItem("isAuth"); // Remove the authentication status from local storage or state
        navigate("/login"); // Add any additional actions or redirection after logout
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <button
      className="flex bottom-0 shadow-lg rounded-full bg-white invisible md:visible transition-shadow ease-in-out duration-400 hover:shadow-2xl"
      onClick={handleLogout}
    >
      <AiOutlineLogout
        size={40}
        className="m-3 p-2 rounded-full text-accent md:bg-gray-50 cursor-pointer transition-all ease-in-out duration-500 hover:rounded-md"
      />
    </button>
  );
};

export default LogoutBtn;
