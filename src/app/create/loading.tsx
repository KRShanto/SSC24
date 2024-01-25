"use client";

import EmailSendingAnimation from "@/../public/Loading.json";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

export default function Loader() {
  return (
    <div>
      <Player
        autoplay
        loop
        src={EmailSendingAnimation}
        style={{ height: "300px", width: "300px" }}
      >
        <Controls
          visible={false}
          buttons={["play", "repeat", "frame", "debug"]}
        />
      </Player>
    </div>
  );
}
