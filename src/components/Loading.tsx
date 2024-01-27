"use client";

import EmailSendingAnimation from "@/../public/Loading.json";
import dynamic from "next/dynamic";
const Player = dynamic(
  async () => (await import("@lottiefiles/react-lottie-player")).Player,
  {
    ssr: false,
  },
);
const Controls = dynamic(
  async () => (await import("@lottiefiles/react-lottie-player")).Controls,
  {
    ssr: false,
  },
);

export default function Loading() {
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
