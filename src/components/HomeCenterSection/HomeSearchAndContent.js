import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import SearchBar from "../SearchBar";
import HomeContent from "./HomeContent";
import samplePost from "../../assets/sample_post.jpg";
import samplePost2 from "../../assets/sample_post2.jpeg";
import samplePost3 from "../../assets/samplepost_sq.webp";
import defaultUser from "../../assets/user.jpg";

import NotesList from "./NotesList";

import { authInstance, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  setDocs,
  query,
  where,
} from "firebase/firestore";

import { FaLinkedin } from "react-icons/fa";
import { emojiMap } from "../Exports";

export default function HomeSearchAndContent() {
  const [writing, setWriting] = useState("");
  const [userData, setUserData] = useState(null);
  const [user] = useAuthState(authInstance);
  const [note, setNote] = useState("");
  const [username, setUsername] = useState("shdakywdjshadbhyug");

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);

        try {
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userDataFromFirestore = userDocSnapshot.data();
            setUserData(userDataFromFirestore);
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
        }
      }
    };

    const fetchUserNote = async () => {
      if (user) {
        const notesRef = doc(db, "notes", user.uid);
        try {
          const userNotes = await getDoc(notesRef);
          if (userNotes.exists()) {
            const userNote = userNotes.data();
            if (userNote) {
              setNote(userNote.note);
            }
          }
        } catch (error) {
          console.error("Error fetching user note from Firestore:", error);
        }
      } else {
        console.error("User data does not exist in Firestore");
      }
    };

    fetchUserData();
    fetchUserNote();
  }, [user]);

  const setNewNote = async () => {
    if (user && userData) {
      const notesRef = doc(db, "notes", user.uid);
      const newNote = {
        id: userData.id, // Assuming this is the username field
        note: note,
      };
      try {
        await updateDoc(notesRef, newNote);
        // Update note directly within existing userData object

        setUserData((prevUserData) => {
          const updatedUserData = { ...prevUserData };
          updatedUserData.note = newNote.note;
          return updatedUserData;
        });
      } catch (error) {
        console.error("Error updating note:", error);
      }
    } else {
      console.error("User data does not exist in Firestore");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center overflow-x-hidden md:pl-12 lg:pl-12">
      <div className="flex w-screen justify-center fixed top-0 bg-white shadow-lg ml-0 md:ml-20">
        <SearchBar />
      </div>
      {/* NOTES */}
      <span className="w-screen mt-5 mb-2 border-t-2 border-gray-200"></span>
      <div className="flex flex-col lg:grid md:grid-cols-3 mt-8">
        <div className="flex flex-col max-w-[45vh] max-h-[80vh] overflow-y-auto overflow-x-hidden fixed h-screen shadow-lg m-4 ml-8 p-4 invisible lg:visible bg-white border-gray-200 border-2 rounded-lg scrollbar scrollbar-w-1 scrollbar-track-transparent scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full">
          <div className="bg-white">
            <p className="text-lg font-semibold">&nbsp;Notes</p>
          </div>
          <span className="border-t-2 border-accent mt-2 mb-2"></span>
          <form
            className="flex flex-col border-2 border-gray-300 rounded-md shadow-md bg-frost"
            onSubmit={(e) => {
              e.preventDefault();
              setNewNote();
            }}
          >
            <textarea
              type="text"
              name=""
              id=""
              placeholder="Write new..."
              value={note}
              maxLength={100}
              className="p-2 focus:outline-none w-[38vh]"
              onChange={(e) => {
                setNote(e.target.value);
              }}
              style={{
                resize: "none",
              }}
            />
            <button
              type="submit"
              className="p-2 border-t-2 border-gray-300 hover-bg-gray-200 font-semibold"
              // onClick={uploadNote}
            >
              Write
            </button>
          </form>
          {/**
           *
           * Same data for mobile part of the section
           */}
          <div className="flex flex-col mt-4 border-gray-200 border-2 p-2 rounded-md shadow-md bg-frost sticky top-0">
            <div className="flex items-center">
              <img
                src={defaultUser}
                alt={username}
                width={"38rem"}
                height={"38rem"}
                style={{
                  objectFit: "cover",
                }}
                className="rounded-full"
              />{" "}
              <Link
                to={`/user/${userData ? userData.user : ""}`}
                className="text-sm font-semibold font-otherNames"
              >
                &nbsp;@{userData ? userData.user : ""}
              </Link>
            </div>
            <p className="mt-2 text-sm">
              <NotesList
                notes={userData ? [userData.note] : []}
                username={username}
              />
            </p>
          </div>

          {/**
           *
           */}

          {/** */}
        </div>
        {/***
         * Mobile
         */}

        <div className="flex md:hidden w-full max-w-[100vw] overflow-x-auto bg-white border-gray-200 border-2 rounded-lg shadow-md p-4">
          <form className="flex flex-col border-2 border-gray-300 rounded-md shadow-md bg-frost max-w-[60vw]">
            <textarea
              type="text"
              name=""
              id=""
              placeholder="Write new..."
              maxLength={60}
              className="p-2 focus:outline-none w-[44vh]"
              onChange={(e) => {
                setWriting(e.target.value);
              }}
              style={{
                resize: "none",
              }}
            />
            <button
              type="submit"
              className="p-2 border-t-2 border-gray-300 hover:bg-gray-200 font-semibold"
            >
              Write
            </button>
          </form>
          <div className="flex flex-col border-gray-200 border-2 p-2 rounded-md shadow-md bg-frost min-w-[60vw] max-w-[70vw] ml-2">
            <div className="flex items-center">
              <img
                src={defaultUser}
                alt={username}
                width={"13%"}
                height={"13%"}
                style={{
                  objectFit: "cover",
                }}
                className="rounded-full"
              />{" "}
              <Link
                to={`/user/username`}
                className="text-sm font-semibold font-otherNames"
              >
                &nbsp;@{username}
              </Link>
            </div>
            <p className="mt-2 text-sm">
              Nunc sed sapien dignissim, cursus eros sed, faucibus nisl. Nullam
              nec pretium mauris. Aliquam ac porta dolor.
            </p>
          </div>

          {/**
           *
           */}
        </div>

        <div className="flex flex-col items-center justify-center mb-20 md:mb-0 w-full md:w-screen">
          {/**
           * Map function to be used
           */}
          <HomeContent image={samplePost} />
          <HomeContent image={samplePost2} />
          <HomeContent image={samplePost3} />
          <HomeContent image={samplePost} />
          <HomeContent image={samplePost2} />
          <HomeContent image={samplePost} />
          <HomeContent image={samplePost2} />
          <HomeContent image={samplePost3} />
          <HomeContent image={samplePost3} />
          <HomeContent image={samplePost} />
          <HomeContent image={samplePost2} />
          <HomeContent image={samplePost3} />
        </div>
        <div className="flex flex-col mt-35 fixed right-0 max-w-[40vh] m-4 invisible lg:visible">
          <div className="flex justify-between">
            <div className="flex items-center mb-4 sticky top-0">
              <img
                src={userData?.DP || user?.photoURL || defaultUser}
                className="rounded-full shadow-lg"
                style={{
                  objectFit: "cover",
                  width: "4rem",
                  height: "4rem",
                }}
              />
              <Link to={`/myprofile`} className="text-sm font-bold">
                <div className="flex flex-col">
                  <p className="text-lg font-bold font-name">
                    &nbsp;&nbsp;{userData?.name || user?.displayName}
                  </p>
                  <p className="text-xs font-otherNames">
                    &nbsp;&nbsp;@{userData?.username || "" /*user?.uid*/}
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex flex-col max-h-[50vh] w-[18vw] overflow-y-auto h-screen p-2 border-2 border-gray-200 rounded-lg shadow-lg scrollbar scrollbar-w-1 scrollbar-track-transparent scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full bg-white">
            <p className="font-semibold">Top Accounts to Follow</p>
            <span className="border-t-2 border-accent mt-2 mb-2"></span>
            <div className="flex items-center justify-evenly mb-2 w-full">
              <div className="flex items-center w-full">
                <img
                  src={defaultUser}
                  alt={username}
                  width={"40rem"}
                  height={"40rem"}
                  className="rounded-full"
                />{" "}
                <Link
                  to={`/user/username`}
                  className="text-sm font-semibold font-otherNames"
                >
                  &nbsp;@
                  {username.length > 10
                    ? username.substring(0, 10) + "..."
                    : username}
                  {emojiMap[username[0]?.toUpperCase()]}
                  &nbsp;
                  <span className="font-emoji">{}</span>
                </Link>
              </div>
              <button className="border-1 border-primary  text-primary text-sm p-1 pl-2 pr-2 rounded-lg hover:text-white hover:bg-text hover:border-0">
                Follow
              </button>
            </div>
          </div>

          <p className="text-gray-400 text-xs mt-5">
            <span className="font-thin">Developed by</span>{" "}
            <span className="font-medium">
              <a
                href="https://www.linkedin.com/in/saiuttarkar"
                target="_blank"
                style={{
                  textDecoration: "underline",
                }}
                className="flex items-center hover:text-gray-500"
              >
                <FaLinkedin />
                &nbsp;Uttarkar Sai Nath Rao
              </a>
            </span>
            <span className="font-medium">
              <a
                href="https://www.linkedin.com/in/abhinav-krishna-mallula/"
                target="_blank"
                style={{
                  textDecoration: "underline",
                }}
                className="flex items-center hover:text-gray-500"
              >
                <FaLinkedin />
                &nbsp;Abhinav Krishna Mallula
              </a>
            </span>
          </p>
          <a
            className="text-gray-400 text-sm mt-2"
            href="https://github.com"
            target="_blank"
            style={{
              textDecoration: "none",
            }}
          >
            &#169;&nbsp;2023 <span className="font-logo">PinFluence</span>
          </a>
        </div>
      </div>
    </div>
  );
}
