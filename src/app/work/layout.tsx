import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Kaidevlab",
  description: "Real products, honest status, clear direction. Explore web applications, systems automation, education platforms, and visual media by Kai.",
  alternates: { canonical: "/work/" },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
