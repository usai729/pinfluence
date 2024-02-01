import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ImCross } from "react-icons/im";
import { AiFillEdit, AiOutlineLogout } from "react-icons/ai";
import { BsFileEarmarkArrowUpFill } from "react-icons/bs";
import { TbPhotoEdit } from "react-icons/tb";
import { MdOutlineDeleteForever } from "react-icons/md";

import { Alert, useUpdateDP } from "../Exports";
import { authInstance, db, storage } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore"; // Import doc and getDoc

// import {setFile,updateDP} from "../Exports"

import Nav from "../Nav";
import DefaultUser from "../../assets/user.jpg";
import SearchBar from "../SearchBar";
import { Posts, emojiMap } from "../Exports";
import Post from "../Post";

import IMG1 from "../../assets/backgrounds/1.jpg";
import IMG2 from "../../assets/backgrounds/2.jpg";
import IMG3 from "../../assets/backgrounds/3.jpg";
import IMG4 from "../../assets/backgrounds/4.jpg";
import IMG5 from "../../assets/sample_post2.jpeg";

export default function MyProfile() {
  const [sort, setSort] = useState("date");
  const [followingModal, setFollowingModal] = useState(false);
  const [followersModal, setFollowersModal] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [dpModal, setDpModal] = useState(false);

  const [userData, setUserData] = useState(null);
  const [userNote, setUserNote] = useState();
  const [editedUsername, setEditedUsername] = useState("");
  const [editedName, setEditedName] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const [newdp, setNewDp] = useState(null);

  const filereader = new FileReader();

  var username = "user";

  const closeModals = useCallback((event) => {
    if (event.key === "Escape") {
      setEditProfileModal(false);
      setFollowersModal(false);
      setFollowingModal(false);
      setShowPost(false);
      setDpModal(!dpModal);
    }
  }, []);

  const navigate = useNavigate(); // Get the navigation function from React Router

  const [user] = useAuthState(authInstance);

  const handleLogout = () => {
    authInstance
      .signOut()
      .then(() => {
        // Successful logout
        localStorage.removeItem("isAuth"); // Remove the authentication status from local storage or state
        navigate("/login"); // Add any additional actions or redirection after logout
      })
      .catch((error) => {
        // Handle logout error
        console.error("Logout error:", error);
      });
  };

  const notesRef = doc(db, "notes", user.uid);

  const fetchUserData = async () => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const notesDocRef = collection(db, "notes");

      try {
        setLoading(true);

        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();

          if (userData) {
            setUserData(userData);
            setEditedUsername(userData.username || ""); // Set the existing username to the state variable
            setEditedName(userData.name || "");
          }

          const notesSnap = await getDocs(
            query(notesDocRef, where("id", "==", user.uid))
          );

          if (!notesSnap.empty) {
            notesSnap.forEach((note) => {
              setUserNote(note.data().note);
            });
          }
        } else {
          console.error("User data does not exist in Firestore");
        }
      } catch (error) {
        console.error("Error fetching user data from Firestore:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    document.title = `PinFluence - My Profile - ${user?.displayName}`;

    document.addEventListener("keydown", closeModals, false);
    fetchUserData();
  }, [user]);

  const updateUserProfile = async () => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);

      const newData = {
        username: editedUsername,
        name: editedName,
      };
      const newNote = {
        user: editedUsername,
      };

      try {
        await updateDoc(userDocRef, newData);
        await updateDoc(notesRef, newNote);
        setUserData(newData); // Update the local user data state
        setEditProfileModal(false); // Close the "Edit Profile" modal
        setUserData(newNote);

        navigate(0);
      } catch (error) {
        console.error("Error updating user data in Firestore:", error);
      }
    }
  };

  const { setFile, updateDP } = useUpdateDP(user?.uid);

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  return (
    <>
      <Nav />
      <div
        className={`flex flex-col justify-content items-center mb-20 md:mb-0 overflow-x-hidden`}
      >
        <div className="flex w-screen justify-center fixed top-0 bg-white shadow-lg ml-0 z-10">
          <SearchBar />
        </div>
        <div
          className={`${
            followingModal ||
            followersModal ||
            editProfileModal ||
            showPost ||
            dpModal
              ? "blur-sm"
              : "blur-none"
          } flex flex-col justify-content items-center overflow-x-hidden transition-all duration-500 ease-in-out mt-12 rounded-br-xl rounded-bl-xl shadow-lg md:pr-4 md:pl-4 pb-4 z-0 bg-white`}
        >
          <div className="flex flex-col items-center mt-4 ">
            <div className="w-max relative">
              <img
                src={userData?.DP || user?.photoURL || DefaultUser}
                alt=""
                className="group rounded-full cursor-pointer"
                style={{
                  width: "15rem",
                  height: "15rem",
                  objectFit: "cover",
                }}
                onClick={() => {
                  setDpModal(!dpModal);
                }}
              />
              <button
                type="submit"
                className="text-md invisible group-hover:visible hover:text-xl transition-all duration-200 ease-in-out absolute top-0 right-0 bottom-0 left-0 bg-white rounded-full p-2 outline-none"
                onClick={() => {
                  setDpModal(!dpModal);
                }}
              >
                <TbPhotoEdit className="text-md" />
              </button>
            </div>
            <p className="text-2xl font-name font-bold">
              {userData?.name || user?.displayName}
            </p>
            <p className="text-2x2">@{userData?.username}</p>
            <div className="flex justify-between w-2/3">
              <p
                className="font-bold text-center cursor-pointer"
                onClick={() => {
                  setFollowersModal(!followersModal);
                }}
              >
                0 <br /> followers
              </p>
              <p
                className="font-bold text-center cursor-pointer"
                onClick={() => {
                  setFollowingModal(!followingModal);
                }}
              >
                0 <br /> following
              </p>
            </div>
            <div className="flex justify-between w-full">
              <button
                className="text-center bg-text text-white rounded-sm p-2 m-2 w-11/12 hover:bg-btnHover outline-none "
                onClick={() => {
                  setEditProfileModal(!editProfileModal);
                }}
              >
                Edit Profile
              </button>
              <button onClick={handleLogout} className="cursor-pointer">
                <AiOutlineLogout size={25} className="text-accent" />
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
                padding: "0.5rem",
              }}
            >
              <option value="" defaultValue={this} selected disabled>
                Sort by
              </option>
              <optgroup>
                <option value="date">Upload date (default)</option>
                <option value="likes">Likes</option>
              </optgroup>
            </select>
          </div>
          {userNote && (
            <div className="flex shadow-md m-4 p-4 border-2 border-gray-300 rounded-md sm:max-w-[110vw] md:min-w-full md:max-w-[62vw] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full">
              <div className="flex flex-row space-x-4 p-2 w-full">
                <div className="flex flex-col p-2 border-1 border-gray-300 rounded-md w-full">
                  <div className="flex items-center w-full">
                    <img
                      src={userData?.DP || user?.photoURL || DefaultUser}
                      alt={username}
                      width={"35rem"}
                      height={"35rem"}
                      style={{
                        objectFit: "cover",
                      }}
                      className="rounded-full"
                    />
                    <Link
                      to={`/user/username`}
                      className="text-sm font-semibold font-otherNames"
                    >
                      &nbsp;@{userData?.username}
                      <span className="font-emoji">
                        {emojiMap[username[0]]}
                      </span>
                    </Link>
                  </div>
                  <p className="mt-2 text-sm">{userNote}</p>
                  <div className="flex items-right justify-end">
                    <MdOutlineDeleteForever
                      size={20}
                      className="cursor-pointer text-red-800 hover:text-accent"
                      onClick={async () => {
                        const notesRef = collection(db, "notes"); // Make sure this is properly defined

                        const notesSnap = await getDocs(
                          query(notesRef, where("id", "==", user.uid))
                        );

                        if (!notesSnap.empty) {
                          notesSnap.forEach(async (note) => {
                            await deleteDoc(note.ref);
                          });
                        }

                        fetchUserData();
                      }}
                    />
                  </div>
                </div>

                {/*** */}

                {/* Repeat this content block as needed */}
                {/* <div className="flex flex-col p-2 border-1 border-gray-300 rounded-md">
      <!-- Content for the next item -->
    </div> */}
              </div>
              )
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3">
            {/******* */
            /*/ SAMPLE POSTS \*/
            /******* */}
            <Posts
              image={IMG1}
              id="326421332"
              explore={true}
              setShowPost={setShowPost}
              showPost={showPost}
            />
            <Posts
              image={IMG2}
              id="219739867"
              explore={true}
              setShowPost={setShowPost}
              showPost={showPost}
            />
            <Posts
              image={IMG3}
              id="382617218"
              explore={true}
              setShowPost={setShowPost}
              showPost={showPost}
            />
            <Posts
              image={IMG4}
              id="988671266"
              explore={true}
              setShowPost={setShowPost}
              showPost={showPost}
            />
            <Posts
              image={IMG5}
              id="988671266"
              explore={true}
              setShowPost={setShowPost}
              showPost={showPost}
            />
            {/******* */}
          </div>
        </div>
        <span className="border-2 border-gray-700 w-screen mt-4"></span>
        <div
          className={`flex justify-center items-center h-screen w-screen sm:m-4 md:0 ${
            followersModal ||
            followingModal ||
            editProfileModal ||
            showPost ||
            dpModal
              ? "absolute visible"
              : "none invisible"
          }`}
        >
          {/**
           * DP MODAL
           */}
          {dpModal ? (
            <div
              className={`following-followers-editprofile ${
                dpModal ? "visible fixed" : "invisible"
              } transition-opacity duration-500 ease-in-out justify-center bg-white shadow-xl rounded-lg flex p-4`}
              style={{
                opacity:
                  followersModal ||
                  followingModal ||
                  editProfileModal ||
                  showPost ||
                  dpModal
                    ? 1
                    : 0,
                transition: "opacity 0.5s ease",
              }}
            >
              <div className="flex flex-col justify-center items-center">
                <div className="text-lg font-semibold flex justify-between">
                  <p>Edit profile picture</p>
                  &nbsp;
                  <ImCross
                    className="cursor-pointer"
                    onClick={() => {
                      setDpModal(!setDpModal);
                    }}
                  />
                </div>
                <form
                  className="flex flex-col justify-content items-center m-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateDP();
                  }}
                >
                  {newdp === null ? (
                    <label
                      for="picknewdp"
                      className="cursor-pointer"
                      id="dplabel"
                    >
                      <BsFileEarmarkArrowUpFill
                        className="text-gray-300 hover:text-gray-500"
                        size={60}
                      />
                    </label>
                  ) : (
                    <img
                      src={newdp}
                      style={{
                        width: "15rem",
                        height: "15rem",
                        objectFit: "cover",
                      }}
                      className="rounded-full shadow-lg mb-2"
                      onClick={() => {
                        document.getElementById("picknewdp").click();
                      }}
                    />
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    className="m-2"
                    id="picknewdp"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      //e.preventDefault()
                      handleChange(e);
                      try {
                        filereader.addEventListener("load", () => {
                          setNewDp(filereader.result);
                        });
                        try {
                          //filereader.readAsDataURL(e.target.files[0]);
                          console.log(e.target.files[0]);
                          filereader.readAsDataURL(e.target.files[0]);
                        } catch (e) {
                          //document.getElementById("alert").style.display = "block";
                          console.log(e);
                        }
                      } catch (e) {
                        //document.getElementById("alert").style.display = "block";
                        console.log(e);
                      }
                    }}
                  />
                  <button
                    type="submit"
                    className="rounded-md flex items-center justify-center border-0 w-full hover:w-full hover:border-0 bg-gradient-to-br hover:bg-gradient-to-tl from-primary via-30% to-text text-white font-semibold p-3 transition-all duration-200 ease-linear"
                  >
                    Set Profile Picture
                  </button>
                </form>
              </div>
            </div>
          ) : (
            ""
          )}
          {/* 
              POST
            */}
          {showPost ? (
            <div
              className={`following-followers-editprofile ${
                followingModal ||
                followersModal ||
                editProfileModal ||
                showPost ||
                dpModal
                  ? "visible fixed"
                  : "invisible"
              } transition-opacity duration-500 ease-in-out flex justify-center`}
              style={{
                opacity:
                  followersModal ||
                  followingModal ||
                  editProfileModal ||
                  showPost
                    ? 1
                    : 0,
                transition: "opacity 0.5s ease",
              }}
            >
              <Post myprofile={true} fromHome={false} />
              <ImCross
                className="cursor-pointer"
                onClick={() => {
                  setShowPost(!showPost);
                }}
              />
            </div>
          ) : (
            ""
          )}
          <div
            className={`following-followers-editprofile ${
              followingModal || followersModal || editProfileModal
                ? "visible fixed"
                : "invisible"
            } bg-white shadow-lg p-4 rounded-lg transition-opacity duration-500 ease-in-out`}
            style={{
              opacity:
                followersModal || followingModal || editProfileModal ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            {followingModal ? (
              <div className="flex flex-col items-center">
                <div className="flex justify-between items-center">
                  <p className="mb-2 font-semibold text-black text-lg">
                    Following
                  </p>
                  &nbsp;
                  <ImCross
                    className="cursor-pointer"
                    onClick={() => {
                      setFollowingModal(!followingModal);
                    }}
                  />
                </div>
                <ul className="list-none overflow-y-auto max-h-[50vh]">
                  <li className="border-accent border-b-2 pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src={DefaultUser}
                          className="rounded-full"
                          style={{
                            width: "10%",
                          }}
                          alt=""
                        />
                        <Link to={`/user/username`}>&nbsp;@username</Link>
                      </div>
                      <button className="outline-none focus:outline-none border-2 border-gray-700 p-1 rounded-md text-sm">
                        Unfollow
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            ) : (
              ""
            )}
            {followersModal ? (
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-between">
                  <p className="mb-2 font-semibold text-black text-lg">
                    Followers
                  </p>
                  &nbsp;
                  <ImCross
                    className="cursor-pointer"
                    onClick={() => {
                      setFollowersModal(!followersModal);
                    }}
                  />
                </div>
                <ul className="list-none overflow-y-auto max-h-[50vh]">
                  <li className="border-accent border-b-2 pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src={DefaultUser}
                          className="rounded-full"
                          style={{
                            width: "10%",
                          }}
                          alt=""
                        />
                        <Link to={`/user/username`}>&nbsp;@username</Link>
                      </div>
                      <button className="outline-none focus:outline-none border-2 border-gray-700 p-1 rounded-md text-sm">
                        Remove
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            ) : (
              ""
            )}
            {editProfileModal ? (
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-between">
                  <p className="mb-2 font-semibold text-black text-lg">
                    Edit Profile
                  </p>
                  &nbsp;
                  <ImCross
                    className="cursor-pointer"
                    onClick={() => {
                      setEditProfileModal(false);
                    }}
                  />
                </div>
                <div className="form flex">
                  <form
                    action=""
                    className="flex flex-col justify-center items-center"
                    onSubmit={(e) => {
                      e.preventDefault();
                      updateUserProfile();
                      updateDP();
                      //navigate(0);
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Edit username"
                      value={editedUsername}
                      className="focus:outline-none p-2 border-2 border-gray-300 rounded-md m-2 w-full text-center"
                      style={{
                        border: "1px solid lightgray",
                      }}
                      onChange={(e) => {
                        setEditedUsername(e.target.value);

                        const usernameRegex = /^[a-z_][a-zA-Z0-9_]*$/;
                        document.getElementById("editbtn").style.display =
                          "flex";
                        if (
                          (!usernameRegex.test(e.target.value) ||
                            e.target.value.includes(" ")) &&
                          e.target.value.length != 0
                        ) {
                          document.getElementById("editbtn").style.cursor =
                            "not-allowed";
                          document.getElementById(
                            "editbtn"
                          ).ariaDisabled = true;
                          e.target.style.border = "1px solid red";
                        } else {
                          document.getElementById("editbtn").style.cursor =
                            "pointer";
                          document.getElementById(
                            "editbtn"
                          ).ariaDisabled = false;
                          e.target.style.border = "1px solid lightgray";
                        }
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Edit password"
                      className="focus:outline-none p-2 border-2 border-gray-300 rounded-md m-2 w-full text-center"
                    />
                    {/* <input
                      type="text"
                      value={user.email}
                      placeholder="Edit e-mail"
                      className="focus:outline-none p-2 border-2 border-gray-300 rounded-md m-2 w-full"
                    /> */}
                    <input
                      type="text"
                      value={editedName}
                      placeholder="Edit name"
                      onChange={(e) => setEditedName(e.target.value)} // Update editedName state
                      className="focus:outline-none p-2 border-2 border-gray-300 rounded-md m-2 w-full text-center"
                    />
                    {/* <input
                      type="file"
                      
                      placeholder="Edit dp"
                      accept="image/*"
                      onChange={handleChange}
                      className="focus:outline-none p-2 border-2 border-gray-300 rounded-md m-2 w-full text-center"
                  /> */}
                    <button
                      type="submit"
                      className="rounded-md flex items-center justify-center border-0 w-full hover:w-full hover:border-0 bg-gradient-to-br hover:bg-gradient-to-tl from-primary via-30% to-text text-white font-semibold p-3 transition-all duration-200 ease-linear"
                      id="editbtn"
                    >
                      Edit <AiFillEdit />
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
