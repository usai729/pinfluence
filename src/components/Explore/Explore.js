import React, { useCallback, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";

import Nav from "../Nav";
import SearchBar from "../SearchBar";
import { ExplorePost, Posts } from "../Exports";

import IMG1 from "../../assets/backgrounds/1.jpg";
import IMG2 from "../../assets/samplepost_sq.webp";
import Post from "../Post";
import { LogoutBtn } from "../Exports";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function Explore() {
  const [sort, setSort] = useState("default");
  const [showPost, setShowPost] = useState(false);

  const shutPost = useCallback((event) => {
    if (event.key == "Escape") {
      setShowPost(!showPost);
    }
  });

  useEffect(() => {
    document.title = "PinFluence - Explore";

    document.addEventListener("keydown", shutPost, false);
  });

  const images = [
    "https://img.freepik.com/free-photo/vertical-shot-yellow-green-trees-near-water_181624-44119.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/024/715/778/small/sunset-meadow-wildflowers-bloom-in-nature-beauty-generated-by-ai-free-photo.jpg",
    "https://i.pinimg.com/736x/f3/9d/c2/f39dc23820402a2884ac434419506ddf.jpg",
    "https://content.wepik.com/statics/11339891/preview-page0.jpg",
  ];

  const postsData = [
    {
      dp: "https://i.pinimg.com/474x/b2/19/c5/b219c5c5ac8f06624df562ce942509c9.jpg",
      image: "https://wallpaperaccess.com/full/1096323.jpg",
      username: "black_ox",
      caption: "Good things take time!",
    },
    {
      dp: images[1],
      image: images[0],
      username: "aeshetichic",
      caption: "The way of life",
    },
    {
      dp: images[3],
      image: images[1],
      username: "love_.",
      caption: "Everything ends at a point of time...",
    },
    // Add 7 more posts with different usernames and captions

    {
      dp: images[0],
      image: images[2],
      username: "usernotfound",
      caption: "Caption for custom_user3",
    },
    {
      dp: images[2],
      image: images[3],
      username: "begood",
      caption: "Caption for custom_user4",
    },
    {
      dp: "https://i.pinimg.com/474x/b2/19/c5/b219c5c5ac8f06624df562ce942509c9.jpg",
      image: "https://wallpaperaccess.com/full/1096323.jpg",
      username: "black_ox",
      caption: "Good things take time!",
    },
    {
      dp: images[1],
      image: images[0],
      username: "wellhereweare",
      caption: "Caption for custom_user1",
    },
    {
      dp: images[3],
      image: images[1],
      username: "custom_user",
      caption: "Caption for custom_user2",
    },
    // Add 5 more posts with different usernames and captions
  ];

  return (
    <>
      <Nav />
      <div
        className={`flex flex-col justify-center items-center mb-4 z-10 ${
          showPost ? " h-auto overflow-hidden" : ""
        }`}
      >
        <div className="flex w-screen justify-center fixed top-0 bg-white shadow-lg ml-0 md:ml-16 z-10">
          <SearchBar />
        </div>
        <div
          className={`mt-14 ${
            showPost ? " h-auto overflow-hidden" : ""
          } rounded-br-xl rounded-xl shadow-lg md:pr-4 md:pl-4 pb-4 z-0 bg-white w-screen md:w-[50vw]`}
        >
          <select
            name=""
            id=""
            className="outline-none bg-transparent p-4 w-full"
            onChange={(e) => {
              setSort(e.target.value);
            }}
          >
            <option value="default" selected>
              Default
            </option>
            <option value="likes">Likes</option>
            <option value="date">Upload date</option>
          </select>
          <ResponsiveMasonry
            columnsCountBreakPoints={{
              500: 1,
              768: 1,
              900: 2,
              1200: 3,
              1920: 4,
              2500: 5,
              3300: 6,
              3500: 7,
            }}
          >
            <Masonry gutter="1rem">
              {postsData.map((post, index) => (
                <ExplorePost
                  key={index}
                  dp={post.dp}
                  image={post.image}
                  username={post.username}
                  caption={post.caption}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    </>
  );
}
