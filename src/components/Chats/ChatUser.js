import React from "react";
import defaultUser from "../../assets/sample_dp.jpg";
import { Delete } from "@mui/icons-material";

export default function ChatUser() {
  return (
    <div>
      <div className="flex w-full p-2 justify-between items-center">
        <div className="flex justify-center items-center gap-1 cursor-pointer">
          <img
            src={defaultUser}
            alt="user"
            className="rounded-full"
            style={{
              width: "3rem",
              height: "3rem",
              objectFit: "cover",
            }}
          />
          <p className="font-semibold">{"User"}</p>
        </div>
        <button>
          <Delete color="red" />
        </button>
      </div>
    </div>
  );
}
