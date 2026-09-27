import type { Metadata } from "next";
import { AboutClient } from "./about-client";

export const metadata: Metadata = {
  title: "About Kai — Kaidevlab",
  description:
    "Kai is a full-stack developer and creative technologist in Japan building web applications, systems automation, education platforms, and visual media under Kaidevlab.",
};

export default function About() {
  return <AboutClient />;
}