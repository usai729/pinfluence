import React from "react";
import defaultUser from "../../assets/sample_dp.jpg";
import { MoreVert, Send } from "@mui/icons-material";
import { Input } from "@mui/joy";
import { Button } from "@mui/material";

export default function ChatBox() {
  return (
    <div>
      <div className="flex flex-col justify-between w-[60em] h-[80vh] p-3">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-1">
            <img
              src={defaultUser}
              alt="chat image"
              className="rounded-full"
              style={{
                width: "2.8rem",
                height: "2.8rem",
                objectFit: "cover",
              }}
            />
            <p className="font-semibold">{"Username"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 max-h-[60vh] h-[60vh] w-full overflow-y-auto">
          {/* The received msg */}
          <p
            className="p-2 max-w-[25em] bg-gray-300"
            style={{
              overflow: "hidden",
              wordWrap: "break-word",
              borderBottomLeftRadius: "1em",
              borderBottomRightRadius: "1em",
              borderTopRightRadius: "1em",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            pretium nisi dolor, at consequat augue mollis in. Nullam laoreet
            neque tincidunt lectus vestibulum, vitae lobortis ligula ultricies.
          </p>
          {/* The one that is sent */}
          <p
            className="p-2 max-w-[25em] bg-text text-white"
            style={{
              overflow: "hidden",
              wordWrap: "break-word",
              borderTopLeftRadius: "1em",
              borderBottomRightRadius: "1em",
              borderTopRightRadius: "1em",
            }}
          >
            Phasellus id pretium nulla.
          </p>
        </div>
        <Input
          className="w-full"
          placeholder="Write a message..."
          endDecorator={
            <Send
              className="cursor-pointer text-blue-400"
              onClick={() => {
                console.log("Send msg");
              }}
            />
          }
        />
      </div>
    </div>
  );
}
