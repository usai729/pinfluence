import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authInstance, db } from "../../firebase";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { AiFillEye, AiFillEyeInvisible, AiOutlineLogin } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import "../../assets/css/login_signup.css";
import { backgrounds, Alert } from "../Exports";
import {setDoc, doc, getDoc} from "firebase/firestore";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertContent, setAlertContent] = useState("");

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    document.title = "PinFluence - Login";

    const loginSignupSec = document.getElementById("login_signup_sec");

    loginSignupSec.style.background = `url('${
      backgrounds[randomNumberInRange(0, backgrounds.length - 1)]
    }')`;
    loginSignupSec.style.backgroundSize = "cover";

    // Hide the alert element after 3.5 seconds
    setTimeout(() => {
      const alertElement = document.getElementById("alert");
      if (alertElement) {
        alertElement.style.display = "none";
      }
    }, 3500);
  }, []);

  const navigate = useNavigate();

  const manualLogin = async () => {
    if (email.length !== 0 && password.length !== 0) {
      if (email.includes("@")) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            authInstance,
            email,
            password
          );
          const user = userCredential.user;
          console.log("User Logged in:", user);
  
          navigate("/");
        } catch (error) {
          console.error("Error Logging in user:", error.message);
          if (error.code === "auth/invalid-login-credentials") {
            setAlertContent("Invalid login credentials");
          } else {
            setAlertContent("An error occurred while logging in. Please try again.");
          }
          document.getElementById("alert").style.display = "block";
        }
      } else {
        setAlertContent("Enter a valid email address");
        document.getElementById("alert").style.display = "block";
      }
    } else {
      setAlertContent("E-mail/Password cannot be empty");
      document.getElementById("alert").style.display = "block";
    }
  
    const alertElement = document.getElementById("alert");
    if (alertElement) {
      setTimeout(() => {
        alertElement.style.display = "none";
      }, 3500);
    }
  };
  
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
  
    try {
      const result = await signInWithPopup(authInstance, provider);
  
      if (result.user) {
        const userCredential = result.user;
        const uid = userCredential.uid;
  
        // Check if the user already exists in Firestore
        const userRef = doc(db, "users", uid);
        const userDoc = await getDoc(userRef);
  
        if (userDoc.exists()) {
          // User is already registered, show an alert
          console.log("User is already registered");
          signInWithPopup(authInstance, provider)
          .then((result) => {
            localStorage.setItem("isAuth", true);
            console.log(result);
            navigate("/");
          })
          .catch((error) => {
            // Handle errors here
          });
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
  
          // Create a Firestore document for the user
          await setDoc(userRef, userData);
  
          // Store the authentication state
          localStorage.setItem("isAuth", true);
  
          console.log("User signed in and registered:", userCredential);
  
          // Redirect to the home page
          navigate("/");
        }
      } else {
        // Handle unsuccessful sign-in here
        console.error("Sign-in failed.");
      }
    } catch (error) {
      // Handle errors here
      console.error("Error during sign-in:", error);
    }
  };

  // const handleGoogleSignIn = () => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(authInstance, provider)
  //     .then((result) => {
  //       localStorage.setItem("isAuth", true);
  //       console.log(result);
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       // Handle errors here
  //     });
  // };

  return (
    <>
      <div className="flex justify-center items-center h-screen" id="login_signup_sec">
        <div className="flex-flex-col">
          <Alert alertContent={alertContent} bounce={true} fullscreen={false} />
          <div className="container flex justify-center items-center h-96">
            <div className="form flex flex-col items-center justify-center ">
              <section
                id="sec_1"
                className="flexflex-col items-center justify-center bg-white p-8 shadow-lg"
              >
                <h1 className="font-mono cursor-default text-2xl text-center">
                  <p
                    to={"/"}
                    className="font-logo text-transparent bg-clip-text bg-gradient-to-r from-primary to-text text-3xl"
                  >
                    PinFluence
                  </p>
                  {/* <span className="text-sm"> - Login</span> */}
                </h1>
                <input
                  type="email"
                  name=""
                  id=""
                  placeholder="E-mail"
                  className="w-60 border-primary outline-none hover:shadow-sm hover:outline-none border-solid border-2 p-2 focus:border-0 focus:border-b-2"
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
                    className="w-60 border-primary   outline-none hover:shadow-sm hover:outline-none border-solid border-2 p-2 w-6/3 focus.border-0 focus.border-b-2"
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
                  className="group bg-gradient-to-br from-primary via-70% to-text px-3 py-2 font-bold text-white mt-4 hover:bg-white  transition-all ease-in-out duration-200"
                  style={{
                    width: "100%",
                  }}
                  onClick={manualLogin}
                >
                  <div className="flex items-center justify-evenly">
                    Login
                    <AiOutlineLogin
                      size={25}
                      className="group-hover:translate-x-4 transition-transform ease-in duration-200"
                    />
                  </div>
                </button>
                <button
                  className="px-3 py-2 mt-4 w-60 flex shadow-md justify-around text-gray-700 font-sans text-sm items-center bg-white hover:shadow-lg transition-shadow duration-300"
                  onClick={handleGoogleSignIn}
                >
                  <FcGoogle size={30} />
                  <p>Continue with Google</p>
                </button>
                <div className="flex items-center justify-center">
                  <Link className="text-black px-3 py-2 underline-offset-2" to="/signup">
                    Signup
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
