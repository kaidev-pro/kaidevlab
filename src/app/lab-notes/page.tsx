import type { Metadata } from "next";
import { NotesClient } from "./notes-client";

export const metadata: Metadata = {
  title: "Lab Notes — Kaidevlab",
  description:
    "Build logs, tutorials, and field notes from Kaidevlab — covering AI products, developer tools, creative direction, and the build process.",
  alternates: { canonical: "/lab-notes/" },
};

export default function Notes() {
  return <NotesClient />;
}
