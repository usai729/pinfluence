import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { authInstance, provider, db } from "../../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineSwapRight,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { BiSad } from "react-icons/bi";

import "../../assets/css/login_signup.css";

import { Alert, backgrounds } from "../Exports";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [alertContent, setAlertContent] = useState("");

  const navigate = useNavigate(); // useNavigate should be inside the component

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const get_random_name = async () => {
    return new Promise((resolve, reject) => {
      const uri = "https://randomuser.me/api/?nat=us,dk,fr,gb";

      fetch(uri)
        .then((response) => {
          return response.json();
        })
        .then((response2) => {
          resolve(
            response2.results[0].name.first +
              " " +
              response2.results[0].name.last
          );
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  const nextSection = async () => {
    if (email.length !== 0 && password.length !== 0) {
      if (email.includes("@")) {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            authInstance,
            email,
            password
          );
          const user = userCredential.user;

          // Get the user's name
          const name = await get_random_name();

          // Set user document in Firestore
          await setDoc(doc(db, "users", userCredential.user.uid), {
            id: userCredential.user.uid,
            username: userCredential.user.uid,
            name: name,
            profilephoto: "",
            DateJoined: Date.now(),
          });

          // Set initial note document in Firestore
          await setDoc(doc(db, "notes", userCredential.user.uid), {
            id: userCredential.user.uid,
            note: "",
          });

          // You can do something with the newly created user here
          localStorage.setItem("isAuth", true);
          console.log("User created:", user);

          // Navigate to the user's profile page
          navigate("/myprofile");
        } catch (error) {
          if (error.code === "auth/email-already-in-use") {
            setAlertContent(
              "Email already exists. Please use a different email."
            );
          } else {
            setAlertContent("Error creating user: " + error.message);
          }
          const alertElement = document.getElementById("alert");
          if (alertElement) {
            alertElement.style.display = "block";
            setTimeout(() => {
              alertElement.style.display = "none";
            }, 3500);
          }
        }
      } else {
        setAlertContent("Enter a valid email address");
        document.getElementById("alert").style.display = "block";
      }
    } else {
      setAlertContent("E-mail/Password cannot be empty");
      document.getElementById("alert").style.display = "block";
    }
  };

  // const cancelSignup = () => {
  //   document.getElementById("sec_1").style.display = "block";
  //   document.getElementById("sec_2").style.display = "none";

  //   setEmail("");
  //   setUsername("");
  //   setPassword("");
  // };

  // useEffect(() => {
  //   if (document.getElementById("sec_2").style.display === "block") {
  //     document.title =
  //       username.length !== 0
  //         ? `Welcome, ${username} - PinFluence`
  //         : "PinFluence - Sign Up";
  //   } else {
  //     document.title = "PinFluence - Sign Up";
  //   }
  // }, [username]);

  useEffect(() => {
    const loginSignupSec = document.getElementById("login_signup_sec");

    loginSignupSec.style.background = `url('${
      backgrounds[randomNumberInRange(0, backgrounds.length - 1)]
    }')`;
    loginSignupSec.style.backgroundSize = "cover";
  }, [null]);

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(authInstance, provider);

      if (result.user) {
        const userCredential = result.user;
        const uid = userCredential.uid;

        // Check if the user already exists in Firestore
        const userRef = doc(db, "users", uid);
        const userDoc = await getDoc(userRef);
        const notesRef = doc(db, "notes", uid);

        if (userDoc.exists()) {
          // User is already registered, show an alert
          console.log("User is already registered");
          setAlertContent(
            "User already exists. Please login with your Google account."
          );
          document.getElementById("alert").style.display = "block";
          // You can also redirect to the login page or perform other actions if needed
        } else {
          // User is not registered, create a new document
          const userData = {
            id: uid,
            username: uid,
            name: userCredential.displayName,
            profilephoto: userCredential.photoURL,
            DateJoined: Date.now(),
          };
          const notesDB = {
            id: uid,
            note: "",
          };

          // Create a Firestore document for the user
          await setDoc(userRef, userData);

          await setDoc(notesRef, notesDB);

          // Store the authentication state
          localStorage.setItem("isAuth", true);

          console.log("User signed in and registered:", userCredential);

          // Redirect to the home page
          navigate("/");
        }
      } else {
        // Handle unsuccessful sign-in here
        console.error("Sign-up failed.");
      }
    } catch (error) {
      // Handle errors here
      console.error("Error during sign-up:", error);
    }
  };

  return (
    <>
      <div
        className="flex justify-center items-center h-screen"
        id="login_signup_sec"
      >
        <div className="flex-flex-col">
          <Alert alertContent={alertContent} bounce={true} fullscreen={false} />
          <div className="container flex justify-center items-center h-96">
            <div className="form flex flex-col items-center justify-center">
              <section
                id="sec_1"
                className="flex flex-col items-center justify-center bg-white p-8 shadow-lg"
                style={styles.section1}
              >
                <h1 className="font-mono cursor-default text-2xl text-center">
                  <p
                    to={"/"}
                    className="font-logo text-transparent bg-clip-text bg-gradient-to-r from-primary to-text text-3xl"
                  >
                    PinFluence
                  </p>
                  {/* <span className="text-sm"> - Signup</span> */}
                </h1>
                <input
                  type="email"
                  name=""
                  id=""
                  placeholder="E-mail"
                  className="w-60 border-primary outline-none hover:shadow-sm hover:outline-none border-solid border-2 p-2 focus:border-0 focus:border-b-2"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <div className="flex mt-4 items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    name=""
                    id=""
                    placeholder="Password"
                    className="w-60 border-primary outline-none hover:shadow-sm hover:outline-none border-solid border-2 p-2 w-6/3 focus:border-0 focus:border-b-2"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  {showPassword ? (
                    <AiFillEye
                      className="cursor-pointer hover:text-primary text-gray-600 absolute ml-52"
                      size={20}
                      onClick={toggleShowPassword}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      className="cursor-pointer hover:text-primary text-gray-600 absolute ml-52"
                      size={20}
                      onClick={toggleShowPassword}
                    />
                  )}
                </div>
                <button
                  className="group bg-gradient-to-tl from-primary via-70% to-text px-3 py-2 font-bold text-white mt-4 transition-all ease-in-out duration-200"
                  style={{
                    width: "100%",
                  }}
                  onClick={nextSection}
                >
                  <div className="flex items-center justify-evenly">
                    Sign Up{" "}
                    <AiOutlineSwapRight
                      size={25}
                      className="group-hover:translate-x-4 transition-transform ease-in duration-200"
                    />
                  </div>
                </button>
                <button
                  className="px-3 py-2 mt-4 w-60 flex shadow-md justify-around text-gray-700 font-sans text-sm items-center bg-white hover:shadow-lg transition-shadow duration-300"
                  onClick={handleGoogleSignUp}
                >
                  <FcGoogle size={30} />
                  <p>Continue with Google</p>
                </button>
                <div className="flex items-center justify-center">
                  <Link
                    className="text-black px-3 py-2 underline-offset-2"
                    to={"/login"}
                  >
                    Login
                  </Link>
                </div>
              </section>
              <section
                id="sec_2"
                className="flex flex-col items-center justify-center bg-white p-8 shadow-lg"
                style={styles.section2}
              >
                <h1 className="font-mono cursor-default text-2xl text-right">
                  <span className="text-slate-950">Pin</span>Fluence{""}
                </h1>
                <div className="flex flex-col">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Create Username"
                    className="w-60 border-black outline-none hover:shadow-sm hover:outline-none border-solid border-2 p-2 focus:border-0 focus:border-b-2"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                  <button className="w-60 bg-black px-3 py-2 font-bold text-white mt-4 hover:bg-white hover:text-black transition-all ease-in-out duration-200">
                    <div className="flex items-center justify-evenly">
                      Complete
                    </div>
                  </button>
                  <div className="flex w-60 justify-between">
                    <button
                      className="w-60 px-3 py-2"
                      onClick={() => {
                        document.getElementById("sec_1").style.display =
                          "block";
                        document.getElementById("sec_2").style.display = "none";

                        setUsername("");
                      }}
                    >
                      <div className="flex items-center justify-evenly">
                        <FaLongArrowAltLeft />
                        Back
                      </div>
                    </button>
                    <button
                      className="group w-60 px-3 py-2"
                      // onClick={cancelSignup}
                    >
                      <div className="flex items-center justify-evenly">
                        Cancel
                        <BiSad color="red" />
                      </div>
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  section1: {
    display: "block",
  },
  section2: {
    display: "none",
  },
};
