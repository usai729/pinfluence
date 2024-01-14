import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";

import { Link } from "react-router-dom";
import {storage} from '../../firebase';
import {ref} from "firebase/storage";
import * as yup from "yup";

import Nav from "../Nav";
import { Alert, backgrounds } from "../Exports";

import { LuGalleryVerticalEnd } from "react-icons/lu";
import { GrNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

export default function New(props) {
  const reader = new FileReader();
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [imageData, setImageData] = useState(null);
  const [caption, setCaption] = useState("");

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const uploadImage = () => {};

  useEffect(() => {
    const bgsec = document.getElementById("bg");

    bgsec.style.background = `url('${
      backgrounds[randomNumberInRange(0, backgrounds.length - 1)]
    }')`;
    bgsec.style.backgroundSize = "cover";
  }, [null]);

  return (
    <>
      <Nav />
      <div
        className="flex justify-center items-center w-screen h-screen"
        id="bg"
      >
        <Alert alertContent="Couldn't upload image" warning={true} />
        <section
          id="sec_1"
          className="flex flex-col justify-center items-center shadow-2xl rounded-xl p-8 w-full md:w-auto m-4 md:m-0 md:max-w-[40vw] md:min-w-[25vw] md:min-h-[25vw]"
          style={{
            backgroundColor: "#fbfcf8",
          }}
        >
          <div>
            <Link
              to={"/"}
              className="font-logo text-transparent bg-clip-text bg-gradient-to-r from-primary to-text text-3xl"
            >
              PinFluence
            </Link>
          </div>
          <form
            onSubmit={uploadImage}
            className="flex flex-col justify-center items-center"
          >
            <div className="flex justify-center items-center">
              {image.length == 0 || !imageData ? (
                <label
                  htmlFor="postImage"
                  className="group flex flex-col items-center cursor-pointer mb-4"
                >
                  {/*<p className="mr-2">Select image</p>*/}
                  <LuGalleryVerticalEnd
                    size={100}
                    className="m-4 text-gray-400 group-hover:text-gray-500 transition-all duration-300 ease-in-out"
                  />
                  <p className="text-sm text-gray-400 font-semibold group-hover:text-gray-500 transition-all duration-300 ease-in-out">
                    Select from device
                  </p>
                </label>
              ) : (
                ""
              )}
              <input
                type="file"
                name=""
                id="postImage"
                accept="image/*"
                style={{
                  display: "none",
                }}
                onChange={(e) => {
                  try {
                    setImage(e.target.value);

                    reader.addEventListener("load", () => {
                      setImageData(reader.result);
                    });
                    try {
                      reader.readAsDataURL(e.target.files[0]);
                    } catch (e) {
                      document.getElementById("alert").style.display = "block";
                    }
                  } catch (e) {
                    document.getElementById("alert").style.display = "block";
                  }
                }}
              />
              <img
                src={imageData}
                alt=""
                onClick={() => {
                  document.getElementById("postImage").click();
                }}
                className="shadow-md md:max-w-[35vw] md:max-h-[35vh]"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            {image.length != 0 || imageData ? (
              <textarea
                name=""
                id=""
                cols="40"
                rows="3"
                placeholder="Set a caption for the post..."
                className="m-4 p-2 border-2 border-gray-300 rounded-lg focus:outline-none"
              ></textarea>
            ) : (
              ""
            )}
            <button
              type="submit"
              className="border-0 bg-black text-white font-semibold w-full p-3 flex justify-around"
            >
              <p>Create</p>
            </button>
            <button
              className="mt-2"
              onClick={useCallback(() => {
                setImage("");
                setImageData(null);
                setCaption("");

                navigate("/");
              })}
            >
              Cancel &#10006;
            </button>
          </form>
        </section>
      </div>
    </>
  );
}
