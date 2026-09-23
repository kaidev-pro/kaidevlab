import type { Metadata } from "next";
import { AboutClient } from "./about-client";

export const metadata: Metadata = {
  title: "About Kai — Kaidevlab",
  description:
    "Kai is an independent builder in Japan creating AI products, developer tools, learning platforms, and creative experiments under Kaidevlab.",
};

export default function About() {
  return <AboutClient />;
}